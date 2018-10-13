import les from './index.less'
import Pan from './pan'
import FormEdit from './formEdit'
import FormMulti from './formMulti'

const PropSet = ({
  dispatch,
  editor,
}) => {
  const {
    editItem,
  } = editor

  const propsOfPan1 = {
    title: '组件属性',
    styles: {
      height: '25%',
    },
    children: FormEdit,
    fields: [
      {
        inputType: 'Input',
        name: 'name',
        label: '组件名',
        settingOfInput: {
          placeholder: '组件名',
        },
        options: {
          initialValue: editItem.name,
        },
      },
      {
        inputType: 'Viewitem',
        name: 'type',
        label: '组件类型',
        value: editItem.type === 'Y'
          ? '灵活组件(有子组件)'
          : '纯组件(没有子组件)',
      },
    ],
  }
  const propsOfPan2 = {
    title: 'HTML模板参数',
    styles: {
      height: '25%',
    },
    children: FormMulti,
    dispatch,
    editor,
    editType: 'html',
  }
  const propsOfPan3 = {
    title: 'LESS注入变量',
    styles: {
      height: '25%',
    },
    children: FormMulti,
    dispatch,
    editor,
    editType: 'css',
  }
  const propsOfPan4 = {
    title: 'Javascript注入变量',
    styles: {
      height: '25%',
    },
    children: FormMulti,
    dispatch,
    editor,
    editType: 'js',
  }
  return (
    <div className={les.container}>
      <Pan {...propsOfPan1} />
      <Pan {...propsOfPan2} />
      <Pan {...propsOfPan3} />
      <Pan {...propsOfPan4} />
    </div>
  )
}

export default PropSet
