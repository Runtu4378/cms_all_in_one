import * as React from 'react'
import { Form, Modal } from 'antd'
import { default as MyForm } from 'components/form'

class ModalCreateKey extends React.Component {
  render () {
    const {
      form,
      dispatch,
      editor,
      editType,
    } = this.props
    const {
      createKeyVisible,
      createKeyType,
    } = editor

    // 验证表单并提交
    const dealSubmit = () => {
      form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          dispatch({
            type: 'editor/insertNewkey',
            keyType: editType,
            values,
          })
        }
      })
    }

    const baseFields = [
      {
        form,
        inputType: 'Input',
        name: 'name',
        label: '变量名',
        settingOfInput: {
          placeholder: '变量名',
        },
      },
      {
        form,
        inputType: 'Input',
        name: 'defaultValue',
        label: '默认值',
        settingOfInput: {
          placeholder: '默认值',
        },
      },
      {
        form,
        inputType: 'Textarea',
        name: 'dsec',
        label: '变量描述',
        settingOfInput: {
          placeholder: '变量描述',
        },
      },
      // {
      //   form,
      //   inputType: 'Editor',
      //   name: 'rules',
      //   label: '制约规则',
      //   settingOfInput: {
      //     mode: 'javascript',
      //   },
      // },
    ]
    const propsOfModal = {
      title: '新增键值',
      visible: createKeyVisible && createKeyType === editType,
      onCancel: () => {
        dispatch({ type: 'editor/hideCreateKey' })
      },
      onOk: dealSubmit,
    }

    return (
      <div>
        {/* 新增键值弹窗 */}
        {
          createKeyVisible
          && createKeyType === editType
          && (
            <Modal {...propsOfModal}>
              <MyForm fields={baseFields}/>
            </Modal>
          )
        }
      </div>
    )
  }
}

export default Form.create()(ModalCreateKey)
