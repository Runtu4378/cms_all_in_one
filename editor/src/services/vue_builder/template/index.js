import {
  findIndex,
} from 'lodash'
import Component from '../component'
import initTemplate from '../component/initTemplate'

// const replaceQuote = str => str.replace(/__QUOTE_LEFT__/g, '<')

// const createElement = (tag) => {
//   return (content = '', attrs = {}) => {
//     attrs = Object.keys(attrs)
//       .map(k => {
//         return `${k}="${attrs[k]}"`
//       })
//       .join(' ')
//     return replaceQuote(
//       `__QUOTE_LEFT__${tag} ${attrs}>${content}__QUOTE_LEFT__/${tag}>`
//     )
//   }
// }

const wrapDefaultProps = (propsSet) => {
  let obj = {}
  for (let i = 0; i < propsSet.length; i += 1) {
    const tar = propsSet[i]
    obj[tar.name] = tar.defaultValue || ''
  }
  return obj
}

class Template {
  componentTree = []
  pureComponentTree = []

  constructor (tree) {
    this.componentTree = tree
    this.mapTree(tree)
  }

  /** 编辑组件数组，提取纯净的组件数组 */
  mapTree (tree) {
    for(let i = 0; i < tree.length; i += 1) {
      const target = tree[i]
      if (findIndex(this.pureComponentTree, (o) => o._id === target._id) === -1) {
        this.pureComponentTree.push(target)
      }
      if (target.children && target.children.length) {
        this.mapTree(target.children)
      }
    }
  }

  build = async () => {
    const codeListQueue = []
    let resArr = []
    for(let i = 0; i < this.pureComponentTree.length; i += 1) {
      const target = this.pureComponentTree[i]
      const comp = new Component({
        name: target.name,

        template: target.html_code,
        style: target.css_code,
        style_props: wrapDefaultProps(target.css_proptypes),
        script: target.js_code,
        script_props: wrapDefaultProps(target.js_proptypes),
      })
      codeListQueue.push(
        comp.build().then(code => {
          resArr[i] = code
        })
      )
    }
    await Promise.all(codeListQueue)
    return resArr
  }

  render = async () => {
    console.log(this.componentTree)
    console.log(this.pureComponentTree)
    const strArr = await this.build()
    const templateStr = initTemplate(this.componentTree)
    const componentsStr = this.pureComponentTree.map(d => `${d.name}: ${d.name}.default`)
    console.log(templateStr)
    console.log(componentsStr)
    const js = `
${strArr.map(d => `<script>${d}</script>\n`).join('')}
<script>
new Vue({
  el: '#app',
  components: { ${componentsStr.join(',')} },
  template: '${templateStr}',
})
</script>
`
    // const body = createElement('script')(js)
    // 拼接字符串
    const htmlStr = `
<!DOCTYPE html>
<html>
<head>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
<div id="app"><solt /></div>
</body>
${js}
</html>
`
    return htmlStr
  }
}

export default Template
