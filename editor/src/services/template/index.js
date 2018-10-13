import Component from '../component'

const replaceQuote = str => str.replace(/__QUOTE_LEFT__/g, '<')

const createElement = (tag) => {
  return (content = '', attrs = {}) => {
    attrs = Object.keys(attrs)
      .map(k => {
        return `${k}="${attrs[k]}"`
      })
      .join(' ')
    return replaceQuote(
      `__QUOTE_LEFT__${tag} ${attrs}>${content}__QUOTE_LEFT__/${tag}>`
    )
  }
}

class Template {
  componentTree = []
  propTree = []
  propValue = {}

  constructor (tree) {
    console.log(tree)
    // 初始化组件树
    this.componentTree = tree
    // 初始化属性树
  }

  mapTree = async (tree) => {
    const that = this
    const codeListQueue = []
    const codeListChildQueue = []
    const codeList = []
    for (let i = 0; i < tree.length; i += 1) {
      const target = tree[i]
      let childValue = null
      // 检查有无子节点
      if (target.children) {
        await that.mapTree(target.children).then(childCodeList => {
          childValue = childCodeList
        })
      }
      // 生成组件对象
      const comp = new Component({ ...target, childValue })
      codeListQueue.push(
        comp.build().then(code => {
          codeList[i] = {
            js: code.js,
            css: code.css,
            html: code.html,
          }
        })
      )
    }
    await Promise.all(codeListQueue)
    await Promise.all(codeListChildQueue)
    return codeList
  }

  /**
   * 生成组件的js、css、html代码
   */
  build = async () => {
    // 遍历组件树
    const topList = await this.mapTree(this.componentTree)
    const topComponent = new Component({
      html_code: '{{@ childrens }}',
      html_transformer: 'artm',
      html_props: {},
  
      css_code: '',
      css_transformer: 'less',
      css_props: {},
  
      js_code: '',
      js_transformer: 'js',
      js_props: {},

      childValue: topList,
    })
    const res = await topComponent.build()
    // const jsBase = `if (window.Vue) {
    //   window.Vue.config.productionTip = false;
    // }
    // // console.clear();
    // document.addEventListener('DOMContentLoaded', __executeCodePan);
    // function __executeCodePan(){
    //   window.parent.postMessage({ type: 'iframe-success' }, '*');
    //   try {
    //     __CONTENT__
    //   } catch (err) {
    //     window.parent.postMessage(
    //       {
    //         type: 'iframe-error',
    //         message: err.frame ? err.message + '\\n' + err.frame : err.stack
    //       },
    //       '*'
    //     )
    //   }
    // };`
    // 合并js代码
    // 合并css代码
    // 合并html代码
    // 输出结果
    return res
  }

  renderStr = async () => {
    let res = await this.build()
    // console.log(res)
    let { js, css, html } = res
    try {
      js = js.replace(/<\/script>/, '<\\/script>')
      js = `
        if (window.Vue) {
          window.Vue.config.productionTip = false;
        }
        // console.clear();
        document.addEventListener('DOMContentLoaded', __executeCodePan);
        function __executeCodePan(){
          window.parent.postMessage({ type: 'iframe-success' }, '*');
          try {
            ${js}
          } catch (err) {
            window.parent.postMessage(
              {
                type: 'iframe-error',
                message: err.frame ? err.message + '\\n' + err.frame : err.stack
              },
              '*'
            )
          }
        };`
    } catch (e) {
      console.error(e)
      throw new Error(e)
    }
  
    const headStyle = createElement('style')(css)
    const head = headStyle
    const body = html + createElement('script')(js)
    // 拼接字符串
    const htmlStr = `<!DOCTYPE html><html><head>${head}</head><body>${body}</body></html>`
    return htmlStr
  }
}

export default Template
