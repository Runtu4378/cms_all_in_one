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

    // 隐藏创建组件弹窗
    const showCreate = () => {
      dispatch({ type: 'component/showCreate', show: false })
    }
    // 验证表单并提交
    const dealSubmit = () => {
      form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          dispatch({ type: 'component/createComponent', payload: values })
        }
      })
    }

    const propsOfModalCreate = {
      dispatch,
      title: '新增组件模板',
      visible: createVisible,
      onCancel: showCreate,
      onOk: dealSubmit,
    }

    const field = [
      {
        form,
        inputType: 'Input',
        name: 'name',
        label: '组件名',
        value: '',
        settingOfInput: {
          placeholder: '组件名',
        },
        options: {
          rules: [
            { required: true, message: '请填写组件名' },
          ],
        },
      },
      {
        form,
        inputType: 'Radio',
        name: 'type',
        label: '组件类型',
        value: '',
        son: [
          {
            value: 'PURE',
            label: '纯组件',
            tips: '没有子组件',
          },
          {
            value: 'RICH',
            label: '富组件',
            tips: '可以有子组件',
          },
        ],
        options: {
          initialValue: 'PURE',
          rules: [
            { required: true, message: '请选择组件类型' },
          ],
        },
      },
      {
        form,
        inputType: 'Radio',
        name: 'code_type',
        label: '语法类型',
        value: '',
        son: [
          {
            value: 'artm',
            label: 'artm',
            tips: 'art-template + css + js',
          },
          {
            value: 'vue',
            label: 'vue',
            tips: 'vueJS',
          },
        ],
        options: {
          initialValue: 'artm',
          rules: [
            { required: true, message: '请选择组件类型' },
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
