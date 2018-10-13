import * as React from 'react'
import debounce from 'debounce'
import createEditor from './createEditor'

export default class Pan extends React.Component {
  constructor (props) {
    super(props)
    this.editorArea = React.createRef()
  }

  componentDidMount () {
    const { mode, onChange } = this.props
    // 初始化编辑器
    this.editor = createEditor(this.editorArea.current, {
      mode,
      autoCloseTags: true,
      readOnly: false,
    })
    // 注册值监听函数
    this.editor.on('change', debounce(e => {
      // this.setState({ code: e.getValue() })
      // this.editorChanged()
      onChange(e.getValue())
    }, 500))
    // 进入编辑状态
    this.editor.on('focus', () => {
      this.editor.focus()
    })
  }

  render () {
    const {
      code,
    } = this.props
    return (
      <textarea
        ref={this.editorArea}
        value={code}
        readOnly={true}
      />
    )
  }
}
