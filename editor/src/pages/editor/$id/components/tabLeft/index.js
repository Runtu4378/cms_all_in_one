import les from './index.less'
import Pan from '../editor'

// 模式定义
// const modes = {
//   html: 'htmlmixed',
//   pug: 'pug',
//   markdown: 'markdown',
//   js: 'jsx',
//   'vue-jsx': 'jsx',
//   babel: 'jsx',
//   jsx: 'jsx', // @deprecated, use "babel"
//   css: 'css',
//   svelte: 'htmlmixed',
//   reason: 'mllike',
//   'coffeescript-2': 'coffeescript',
//   cssnext: 'css',
//   less: 'text/x-less',
//   typescript: 'text/typescript',
//   sass: 'text/x-sass',
//   scss: 'text/x-scss',
//   rust: 'rust',
//   stylus: 'text/x-styl',
// }

// 模式定义
const modes = {
  'artm': 'htmlmixed',
  'less': 'text/x-less',
  'js': 'javascript',
  'vue': 'jsx',
}

const TabLeft = ({
  dispatch,
  loading,
  editor,
}) => {
  const {
    editItem,
  } = editor
  const {
    // code_type,
    html_transformer,
    css_transformer,
    js_transformer,
  } = editItem

  const panHtml = {
    loading: loading.effects['editor/enter'],
    title: 'Template',
    height: '30%',
    editor: {
      mode: modes[html_transformer],
      code: editItem.html_code,
      onChange: (code) => {
        dispatch({
          type: 'editor/updateCode',
          payload: { type: 'html', code },
        })
      },
    },
  }
  const panLess = {
    loading: loading.effects['editor/enter'],
    title: 'Style',
    height: '30%',
    editor: {
      mode: modes[css_transformer],
      code: editItem.css_code,
      onChange: (code) => {
        dispatch({
          type: 'editor/updateCode',
          payload: { type: 'css', code },
        })
      },
    },
  }
  const panJs = {
    loading: loading.effects['editor/enter'],
    title: 'Script',
    height: '40%',
    editor: {
      mode: modes[js_transformer],
      code: editItem.js_code,
      onChange: (code) => {
        dispatch({
          type: 'editor/updateCode',
          payload: { type: 'js', code },
        })
      },
    },
  }
  return (
    <div className={les.container}>
      {/* html编辑器 */}
      <Pan {...panHtml} />
      {/* less编辑器 */}
      <Pan {...panLess} />
      {/* js编辑器 */}
      <Pan {...panJs}/>
    </div>
  )
}

export default TabLeft
