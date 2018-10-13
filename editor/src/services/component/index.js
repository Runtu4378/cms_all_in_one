import * as transform from './transform'

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

class Component {
  html = {
    code: '',
    transformer: 'html',
    prop: {},
  }
  css = {
    code: '',
    transformer: 'css',
    prop: {},
  }
  js = {
    code: '',
    transformer: 'js',
    prop: {},
  }
  /**
   * 组件构造函数
   * @callback 组建类
   */
  constructor ({
    html_code,
    html_transformer,
    html_props,

    css_code,
    css_transformer,
    css_props,

    js_code,
    js_transformer,
    js_props,

    childValue = [],
  }) {
    let htmlBase = { childrens: [] }
    let cssBase = { childrens: [] }
    let jsBase = { childrens: [] }
    if (childValue && childValue.length) {
      htmlBase.childrens = childValue.map(d => d.html).join('')
      cssBase.childrens = childValue.map(d => d.css)
      jsBase.childrens = childValue.map(d => d.js)
    }
    this.html = {
      code: html_code,
      transformer: html_transformer,
      props: { ...html_props, ...htmlBase } || htmlBase,
    }
    
    this.css = {
      code: css_code,
      transformer: css_transformer,
      props: { ...css_props, ...cssBase } || cssBase,
    }
    
    this.js = {
      code: js_code,
      transformer: js_transformer,
      props: { ...js_props, ...jsBase } || jsBase,
    }
  }

  /**
   * 构造组件，生成html字符串
   */
  build = async () => {
    console.log(this)
    let js
    let css
    let html

    // 转换代码
    try {
      await Promise.all([
        transform.js(this.js)
          .then(code => { js = code }),
        transform.html(this.html)
          .then(code => { html = code }),
        transform.css(this.css)
          .then(code => { css = code }),
      ])
    } catch (e) {
      console.error(e)
      throw new Error(e)
    }
  
    return { js, css, html }
  }

  /**
   * 生成组件预览字符串（要嵌入iframe的内容）
   */
  renderStr = async () => {
    let { js, css, html } = await this.build()

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

export default Component
