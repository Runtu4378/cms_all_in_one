import Com from '../../utils/component'
import render from './temp.art'

const DomFunc = new Com(
  'body',
  render,
  {
    childrens: {
      type: 'tempArray',
      desc: '子模板数组',
      defaultValue: [],
    },
  },
)

export default DomFunc
