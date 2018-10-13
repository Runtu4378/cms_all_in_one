import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import { defaultP, basePT } from '../basePT'

const FormItem = Form.Item

class Custom extends React.Component {
  render () {
    const {
      form,
      name,
      label,
      options,
      // settingOfInput,
      layout,
      dom,
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
          dom
        )}
      </FormItem>
    )
  }
}

Custom.defaultProps = {
  ...defaultP,
  dom: null,
}

Custom.propTypes = {
  ...basePT,
  dom: PropTypes.element,
}

export default Custom
