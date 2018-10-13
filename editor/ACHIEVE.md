# 最佳实践

## 组件定义

```javascript
const Dom = () => {
  // 属性获取
  // 方法定义
  // 渲染方法定义
  // 属性定义
  return (
    <div>Dom</div>
  )
}
```

***

## 变单弹窗

```javascript
import * as React from 'react'
import { Form, Modal } from 'antd'
import { default as MyForm } from 'components/form'

class ModalCreate extends React.Component {
  render () {
    const {
      form,
      dispatch,
      visible,
    } = this.props

    // 隐藏创建站点弹窗
    const hideCreate = () => {
      dispatch({ type: 'site/showCreateRoute', show: false })
    }
    // 验证表单并提交
    const dealSubmit = () => {
      form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          // dispatch({ type: 'site/create', payload: values })
        }
      })
    }

    const propsOfModalCreate = {
      dispatch,
      title: '新增路由',
      visible,
      onCancel: hideCreate,
      onOk: dealSubmit,
    }

    const field = [
      {
        form,
        inputType: 'Input',
        name: 'name',
        label: '路由名',
        value: '',
        settingOfInput: {
          placeholder: '路由名',
        },
        options: {
          rules: [
            { required: true, message: '请填写路由名' },
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

```
