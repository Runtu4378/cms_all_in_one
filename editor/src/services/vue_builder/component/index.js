import { request, config } from 'utils'

const { api } = config
const { buildVue } = api

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
  /**
   * 组件构造函数
   */
  constructor ({
    name,

    template,
    style,
    script,
  }) {
    this.name = name
    this.template = template
    this.style = style
    this.script = script
  }

  /**
   * 构造组件
   */
  build = async () => {
    const reqData = {
      name: this.name,

      html_code: this.template,
      css_code: this.style,
      js_code: this.script,
    }
    const { success, data } = await request({
      method: 'post',
      url: buildVue,
      data: reqData,
    })
    if (success) {
      return data
    } else {
      throw new Error(data)
    }
  }

  /**
   * 生成iframe内嵌字符串
   */
  render = async () => {
    const script = await this.build()
    const js = `
if (window.Vue) {
  window.Vue.config.productionTip = false;
  }
  // console.clear();
  document.addEventListener('DOMContentLoaded', __executeCodePan);
  function __executeCodePan(){
  window.parent.postMessage({ type: 'iframe-success' }, '*');
  try {
    ${script.trim()}
    console.log(${this.name})
    new Vue({
      el: '#app',
      components: { ${this.name}: ${this.name}.default },
    })
  } catch (err) {
    window.parent.postMessage(
      {
        type: 'iframe-error',
        message: err.frame ? err.message + '\\n' + err.frame : err.stack
      },
      '*'
    )
  }
  };
`
    const body = createElement('script')(js)
    // 拼接字符串
    const htmlStr = `
<!DOCTYPE html>
<html>
<head>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
<div id="app"><${this.name} /></div>
</body>
${body}
</html>
`
    return htmlStr
  }
}

export default Component
