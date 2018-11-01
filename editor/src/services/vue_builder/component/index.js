import { request, config } from 'utils'
import injection from './injection'
import initTemplate from './initTemplate'

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
  name = ''

  template = ''

  style = ''
  style_props = {}

  script = ''
  script_props = {}

  /**
   * 组件构造函数
   */
  constructor ({
    name,

    template,
    style,
    style_props,
    script,
    script_props,
  }) {
    this.name = name

    this.template = template
    this.style = style
    this.style_props = style_props || {}
    this.script = script
    this.script_props = script_props || {}
  }

  /**
   * 构造组件
   */
  build = async () => {
    const reqData = {
      name: this.name,

      html_code: this.template,
      css_code: injection('css', this.style, this.style_props),
      js_code: injection('js', this.script, this.script_props),
    }
    const { success, data } = await this.getCode(reqData)
    if (success) {
      return data.output
    } else {
      throw new Error(data)
    }
  }

  /**
   * 请求接口，获取编译结果
   * @param {*} data 
   */
  getCode (data) {
    return request({
      method: 'post',
      url: buildVue,
      data,
    })
  }

  /**
   * 生成iframe内嵌字符串
   */
  render = async () => {
    const script = await this.build()
    const templateStr = initTemplate({
      name: this.name,
    })
    const js = `
if (window.Vue) {
  window.Vue.config.productionTip = false;
  }
  // console.clear();
  document.addEventListener('DOMContentLoaded', __executeCodePan);
  function __executeCodePan(){
  window.parent.postMessage({ type: 'iframe-success' }, '*');
  try {
    ${script}
    new Vue({
      el: '#app',
      components: { ${this.name}: ${this.name}.default },
      template: '${templateStr}',
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
<div id="app"></div>
</body>
${body}
</html>
`
    return htmlStr
  }
}

export default Component
