import Com from '../../utils/component'
import render from './temp.art'

const DomFunc = new Com(
  'box',
  render,
  {
    text: { type: 'string', defaultValue: 'text content' }
  },
)

module.exports = DomFunc
