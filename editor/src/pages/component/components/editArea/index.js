import * as React from 'react'
import { Form, Button } from 'antd'
import { Tab } from 'components/layout'
import { default as MyForm } from 'components/form'
import les from './index.less'

class EditArea extends React.Component {
  render () {
    const {
      form,
      editItem,
      onEdit,
    } = this.props

    const handleSubmit = (e) => {
      e.preventDefault()
      form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          onEdit(values)
        }
      })
    }

    const fields = [{
      form,
      inputType: 'Input',
      name: 'componentName',
      label: '组件名',
      value: editItem.conponentName,
      settingOfInput: {
        placeholder: '组件名哦',
      },
    }]

    return (
      <Tab
        title="模板属性"
        position="r"
        className={les.container}
      >
        <Form
          className={les.form}
          onSubmit={handleSubmit}
        >
          <MyForm fields={fields} />
          <Button type="primary" htmlType="submit">预览</Button>
        </Form>
      </Tab>
    )
  }
}

EditArea.defaultProps = {
  editItem: {},
}

export default Form.create()(EditArea)
