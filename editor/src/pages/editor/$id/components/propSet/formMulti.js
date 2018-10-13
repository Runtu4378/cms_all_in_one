import * as React from 'react'
import { Form, Button } from 'antd'
import { default as MyForm } from 'components/form'
import les from './formMulti.less'
import ModalCreateKey from './modelCreateKey'

class MultiForm extends React.Component {
  render () {
    const {
      form,
      dispatch,
      editor,
      editType,
    } = this.props
    const {
      editItem,
    } = editor
    // 键值配置数组
    const keyAry = editItem[`${editType}_proptypes`]

    const onCreateClick = () => {
      dispatch({
        type: 'editor/showCreateKey',
        createKeyType: editType,
      })
    }
    // 验证表单并提交
    const dealSubmit = () => {
      form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          dispatch({
            type: 'editor/updateProps',
            propsType: editType,
            values,
          }).then(() => {
            dispatch({ type: 'editor/buildComponent' })
          })
        }
      })
    }

    const keyFields = keyAry.map(d => {
      return {
        form,
        inputType: 'Input',
        name: d.name,
        label: d.name,
        options: {
          initialValue: d.defaultValue,
        },
        settingOfInput: {
          placeholder: d.dsec,
        },
      }
    })
    const propsOfModalCreateKey = {
      dispatch,
      editor,
      editType,
    }

    return (
      <div>
        <MyForm fields={keyFields} />
        <div className={les.btnArea}>
          <Button onClick={onCreateClick}>新增键值</Button>
          <Button type="primary">保存</Button>
          <Button
            type="primary"
            icon="eye-o"
            onClick={dealSubmit}
          />
        </div>
        {/* 新增键值弹窗 */}
        <ModalCreateKey {...propsOfModalCreateKey} />
      </div>
    )
  }
}

export default Form.create()(MultiForm)
