import * as React from 'react'
import { Form } from 'antd'
import { default as MyForm } from 'components/form'

class FormEdit extends React.Component {
  render () {
    const {
      form,
      fields,
    } = this.props

    const realFields = fields.map(d => ({form, ...d}))

    return (
      <div>
        <MyForm fields={realFields} />
      </div>
    )
  }
}

export default Form.create()(FormEdit)
