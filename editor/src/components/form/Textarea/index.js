import React from 'react'
// import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import { defaultP, basePT } from '../basePT'

const FormItem = Form.Item

class MyTextarea extends React.Component {
  render () {
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
      // getFieldProps,
      // getFieldError,
    } = form

    return (
      <FormItem
        label={label}
        {...layout}
      >
        {getFieldDecorator(name, options)(
          <Input.TextArea {...settingOfInput} />
        )}
      </FormItem>
    )
  }
}

MyTextarea.defaultProps = {
  ...defaultP,
}

MyTextarea.propTypes = {
  ...basePT,
}

export default MyTextarea
