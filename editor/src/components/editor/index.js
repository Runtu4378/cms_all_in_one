import * as React from 'react'
import PropTypes from 'prop-types'
import { UnControlled as CodeMirror, Controlled as CodeMirrorControlled } from 'react-codemirror2'
// 样式引入
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/neat.css'
// 额外配置引入
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/edit/matchtags'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
// 模式引入
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/javascript/javascript.js'

const defaultOptions = {
  theme: 'material',
  autoCloseTags: true,
  lineNumbers: true,
  lineWrapping: true,
  styleActiveLine: true,
  matchTags: { bothTags: true },
  matchBrackets: true,
  foldGutter: true,
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
}

const UnControlledCodeEditor = (props) => {
  return (
    <CodeMirror
      {...props}
      options={{ ...defaultOptions, ...props.options }}
    />
  )
}

UnControlledCodeEditor.defaultProps = {
  options: {},
}

UnControlledCodeEditor.propTypes = {
  value: PropTypes.any, // 值
  options: PropTypes.shape({
    mode: PropTypes.oneOf([
      'htmlmixed',
      'xml',
      'javascript',
    ]),
    // TODO:待完善codemirror的属性规约
  }),
  onChange: PropTypes.func, // 值变化钩子
}

export class Controlled extends React.Component {
  state = {
    value: '',
  }
  render () {
    const props = this.props
    return (
      <CodeMirrorControlled
        value={this.state.value}
        onBeforeChange={(editor, data, value) => {
          // console.log(`data: ${data}`)
          console.log(`value: ${value}`)
          this.setState({value})
          const onChange = this.props.onChange
          if (onChange) {
            onChange(value)
          }
        }}
        options={{ ...defaultOptions, ...props.options }}
      /> 
    )
  }
}

export default UnControlledCodeEditor
