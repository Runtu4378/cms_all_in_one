import * as React from 'react'
import { Form, Modal } from 'antd'
import { default as MyForm } from 'components/form'

class ModalCreate extends React.Component {
  render () {
    const {
      form,
      dispatch,
      visible,
      target,
      parent, 
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
          dispatch({ type: 'site/createRoute', payload: values })
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
        inputType: 'Viewitem',
        name: 'parentSiteName',
        label: '所属站点',
        value: target.name,
      },
      {
        form,
        inputType: 'Viewitem',
        name: 'parentRouteName',
        label: '所属路由',
        value: parent ? parent.name : null,
      },
      {
        form,
        inputType: 'Input',
        name: 'name',
        label: '路由名',
        value: '',
        settingOfInput: {
          placeholder: '路由名（只用于本系统内语义识别）',
        },
        options: {
          rules: [
            { required: true, message: '请填写路由名' },
          ],
        },
      },
      {
        form,
        inputType: 'Radio',
        name: 'type',
        label: '路由类型',
        value: '',
        son: [
          {
            value: 'single',
            label: '单页路由',
            tips: '该路由只会生成单个页面',
          },
          {
            value: 'page',
            label: '分页路由',
            tips: '该路由根据分页码生成多个页面，每个页面的数据各自隔离',
          },
          {
            value: 'multi',
            label: '多页路由',
            tips: '该路由根据路由规则生成多个页面',
          },
        ],
        options: {
          rules: [
            { required: true, message: '请选择路由类型' },
          ],
        },
      },
      {
        form,
        inputType: 'Input',
        name: 'path',
        label: '路由规则',
        value: '',
        settingOfInput: {
          placeholder: '路由规则（生成实际页面的规则，如/newDetail/:id）',
        },
        options: {
          rules: [
            { required: true, message: '请填写路由规则' },
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
