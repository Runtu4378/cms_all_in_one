import React from 'react'
import PropTypes from 'prop-types'
import { Form, Radio, Tooltip } from 'antd'
import { defaultP, basePT } from '../basePT'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class RadioCon extends React.Component {
  render () {
    const {
      form,
      name,
      label,
      options,
      settingOfInput,
      layout,
      son,
    } = this.props

    const {
      radioType,
      extra,
    } = settingOfInput

    const {
      getFieldDecorator,
    } = form

    return (
      <FormItem
        label={label}
        extra={extra}
        {...layout}
      >
        {
          radioType === 'radioButton' ?
            getFieldDecorator(name, options)(
              <RadioGroup size="large">
                {
                  son.map((so, idx) => {
                    return (
                      <Tooltip key={idx} placement={so.placement || 'top'} title={so.tips}>
                        <RadioButton value={so.value}>
                          {so.label}
                        </RadioButton>
                      </Tooltip>
                    )
                  })
                }
              </RadioGroup>
            ) :
            ''
        }
      </FormItem>
    )
  }
}

RadioCon.defaultProps = {
  ...defaultP,
  settingOfInput: {
    radioType: 'radioButton',
  },
}

RadioCon.propTypes = {
  ...basePT,
  settingOfInput: PropTypes.shape({
    radioType: PropTypes.oneOf([
      'radioButton',
    ]),  // 选择器类型
    extra: PropTypes.element, // 额外元素
  }),
  son: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,  // 对应的值
    label: PropTypes.string,  // 显示的label
    tips: PropTypes.string, // 提示的文字
    placement: PropTypes.string,  // 提示所在的位置
  })),
}

export default RadioCon
