import * as React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import { Controlled as CodeMirror} from 'components/editor'
import { defaultP, basePT } from '../basePT'

const FormItem = Form.Item

class Editor extends React.Component {
  render () {
    // console.log(this.props)
    const {
      form,
      name,
      label,
      options,
      settingOfInput,
      layout,
    } = this.props
    const {
      getFieldDecorator,
    } = form

    return (
      <FormItem
        label={label}
        {...layout}
      >
        {getFieldDecorator(name, options)(
          <CodeMirror
            options={settingOfInput}
          />
        )}
      </FormItem>
    )
  }
}

Editor.defaultProps = {
  ...defaultP,
  settingOfInput: {},
}

Editor.propTypes = {
  ...basePT,
  settingOfInput: PropTypes.object,
}

export default Editor
