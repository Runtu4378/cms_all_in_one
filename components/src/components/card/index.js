import Com from '../../utils/component'
import render from './temp.art'

const DomFunc = new Com(
  'card',
  render,
  {
    text: {
      type: 'string',
      desc: '标题文字',
      defaultValue: 'defaultText',
    },
    list: {
      type: 'string',
      desc: '测试文字',
      defaultValue: 'test content',
    },
  },
)

module.exports = DomFunc
