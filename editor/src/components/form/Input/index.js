import React from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input } from 'antd'
import les from './index.less'
import { defaultP, basePT } from '../basePT'

const FormItem = Form.Item

class MyInput extends React.Component {
  // 清除表单输入内容
  clearVal = () => {
    const { name } = this.props
    const { setFields } = this.props.form
    const tar = {}
    tar[name] = null
    setFields(tar)
  }

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

    const clearCon = settingOfInput.clear ? (
      <Icon type="close" className={les.clear} onClick={() => this.clearVal()} />
    ) : null

    const onClick = settingOfInput.onClick || null

    return (
      <FormItem
        label={label}
        className={les.outer}
        {...layout}
      >
        {getFieldDecorator(name, options)(
          <Input
            type={settingOfInput.type}
            placeholder={settingOfInput.placeholder}
            prefix={settingOfInput.prefix}
            addonAfter={clearCon || settingOfInput.addonAfter}
            disabled={settingOfInput.disabled}
            readOnly={settingOfInput.readonly ? 'readonly' : null}
            onClick={onClick}
          />
        )}
      </FormItem>
    )
  }
}

MyInput.defaultProps = {
  ...defaultP,
  settingOfInput: {
    type: 'text',
    clear: false,
  },
}

MyInput.propTypes = {
  ...basePT,
  value: PropTypes.string,
  settingOfInput: PropTypes.shape({
    type: PropTypes.oneOf([
      'text',
    ]),
    placeholder: PropTypes.string,  // 默认显示
    prefix: PropTypes.element,  // 前置ui
    clear: PropTypes.bool,  // 消除值UI显示状态
    addonAfter: PropTypes.element,  // 后置UI
    disabled: PropTypes.bool,
    readonly: PropTypes.bool, // 是否只读
    onClick: PropTypes.func,  // 点击回调
  }),
}

export default MyInput
