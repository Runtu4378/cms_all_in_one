import { Button } from 'antd'
// import PropTypes from 'prop-types'
import { Tab } from 'components/layout'
import les from './index.less'

const List = () => {
  const mapChild = (ary) => {
    if (!ary || ary.length === 0) {
      return <li className={les.noContent}>暂无内容</li>
    }
    return ary.map((d, idx) => {
      return (
        <li>content: {idx}</li>
      )
    })
  }
  return (
    <Tab
      title="组合模板列表"
      position="l"
      className={les.list}
    >
      <ul className={les.ul}>
        {mapChild()}
      </ul>
      <Button
        type="primary"
        className={les.add}
      >新增组合模板</Button>
    </Tab>
  )
}

List.defaultPrrops = {
  //
}

List.propTypes = {
  //
}

export default List
