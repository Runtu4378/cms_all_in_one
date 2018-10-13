import * as React from 'react'
import { Form, Drawer } from 'antd'
import { default as MyForm } from 'components/form'

class EditDrawer extends React.Component {
  render () {
    // 属性获取
    const {
      form,
      dispatch,
      visible,
      item,
    } = this.props

    // 方法定义
    const hide = () => {
      dispatch({ type: 'site/hideEditRoute', show: false })
    }

    // 属性定义
    const propsOfDrawer = {
      title: '路由编辑',
      visible,
      destroyOnClose: true,
      width: '70%',
      onClose: hide,
    }
    // 路由类型值翻译
    let typeValue
    if (item.type === 'single') {
      typeValue = '单页路由'
    } else if (item.type === 'page') {
      typeValue = '分页路由'
    } else if (item.type === 'multi') {
      typeValue = '多页路由'
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
      {
        form,
        inputType: 'Viewitem',
        name: 'type',
        label: '路由类型',
        value: typeValue,
      },
      {
        form,
        inputType: 'Viewitem',
        name: 'path',
        label: '路由规则',
        value: item.path,
      },
    ]

    return (
      <Drawer {...propsOfDrawer}>
        <div>
          <MyForm fields={field} />
        </div>
      </Drawer>
    )
  }
}

export default Form.create({
  mapPropsToFields: ({ item }) => {
    return {
      name: Form.createFormField({ value: item.name }),
    }
  },
})(EditDrawer)
