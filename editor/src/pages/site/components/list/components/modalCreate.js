import * as React from 'react'
import { Form, Modal } from 'antd'
import { default as MyForm } from 'components/form'

class ModalCreate extends React.Component {
  render () {
    const {
      form,
      dispatch,
      createVisible,
    } = this.props

    // 隐藏创建站点弹窗
    const hideCreate = () => {
      dispatch({ type: 'site/showCreate', show: false })
    }
    // 验证表单并提交
    const dealSubmit = () => {
      form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          dispatch({ type: 'site/create', payload: values })
        }
      })
    }

    const propsOfModalCreate = {
      dispatch,
      title: '新增站点',
      visible: createVisible,
      onCancel: hideCreate,
      onOk: dealSubmit,
    }

    const field = [
      {
        form,
        inputType: 'Input',
        name: 'name',
        label: '站点名',
        value: '',
        settingOfInput: {
          placeholder: '站点名',
        },
        options: {
          rules: [
            { required: true, message: '请填写站点名' },
          ],
        },
      },
    ]

    return (
      <div>
        <Modal {...propsOfModalCreate}>
          <div>
            <MyForm fields={field} />
          </div>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(ModalCreate)
