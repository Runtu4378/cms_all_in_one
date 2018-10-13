import PropTypes from 'prop-types'

export const defaultP = {
  layout: {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  },
}

export const basePT = {
  form: PropTypes.object.isRequired,  // antd的表单对象
  inputType: PropTypes.oneOf([
    'Input',
    'Checkbox',
    'Radio',
    'Viewitem',
    'Select',
    'Textarea',
    'Custom',
    'Editor',
  ]), // 表单输入类型
  name: PropTypes.string.isRequired, // 表单项的键值名
  label: PropTypes.string,  // 表单label
  options: PropTypes.object,  // 表单的optiosn
}