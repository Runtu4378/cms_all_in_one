import React from 'react'
import PropTypes from 'prop-types'
import { Form, Checkbox, Row, Tooltip } from 'antd'
import { defaultP, basePT } from '../basePT'

const FormItem = Form.Item

class MyCheckbox extends React.Component {
  render () {
    const {
      form,
      name,
      label,
      settingOfInput,
      layout,
      options,
      son,
    } = this.props

    const {
      getFieldDecorator,
    } = form

    const {
      block,
      extra,
    } = settingOfInput

    return (
      <FormItem
        label={label}
        extra={extra}
        {...layout}
      >
        {getFieldDecorator(name, options)(
          <Checkbox.Group>
            <Row>
              {
                block ?
                  son.map((so, idx) => {
                    return (
                      <div key={idx}>
                        <Tooltip placement={so.placement || 'right'} title={so.tips}>
                          <Checkbox value={so.value}>{so.label}</Checkbox>
                        </Tooltip>
                      </div>
                    )
                  }) :
                  son.map((so, idx) => {
                    return (
                      <Tooltip placement={so.placement || 'top'} title={so.tips}>
                        <Checkbox key={idx} value={so.value}>{so.label}</Checkbox>
                      </Tooltip>
                    )
                  })
              }
            </Row>
          </Checkbox.Group>
        )}
      </FormItem>
    )
  }
}

MyCheckbox.defaultProps = {
  ...defaultP,
  settingOfInput: {
    block: false,
  },
}

MyCheckbox.propTypes = {
  ...basePT,
  settingOfInput: PropTypes.shape({
    block: PropTypes.bool,  // 子选项是否为block
    extra: PropTypes.element, // 额外元素
  }),
  son: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,  // 对应的值
    label: PropTypes.string,  // 显示的label
    tips: PropTypes.string, // 提示的文字
    placement: PropTypes.string,  // 提示所在的位置
  })),
}

export default MyCheckbox
