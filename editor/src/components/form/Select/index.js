import React from 'react'
// import PropTypes from 'prop-types'
import { Form, Select } from 'antd'
import { defaultP, basePT } from '../basePT'

const FormItem = Form.Item
const Option = Select.Option

class SelectCon extends React.Component {
  render () {
    const {
      form,
      name,
      label,
      options,
      settingOfInput,
      son,
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
          <Select style={{ width: '100%' }} {...settingOfInput}>
            {
              son.map((so, idx) => {
                return (
                  <Option value={`${so.value}`} key={idx}>{so.label}</Option>
                )
              })
            }
          </Select>,
        )}
      </FormItem>
    )
  }
}

SelectCon.defaultProps = {
  ...defaultP,
}

SelectCon.propTypes = {
  ...basePT,
}

export default SelectCon
