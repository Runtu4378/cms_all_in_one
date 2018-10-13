import { Button } from 'antd'
import les from './index.less'
import {
  ComponentSelect,
} from './components'

const List = (props) => {
  // 属性获取
  const {
    dispatch,
    siteEdit,
  } = props
  const {
    templateList,
  } = siteEdit

  // 方法定义
  const showComponentSelect = () => {
    // 打开弹窗
    dispatch({ type: 'siteEdit/switchComponentSelect', show: true })
    // 获取数据
    dispatch({ type: 'siteEdit/getComponentSelectData' })
  }

  // 渲染方法定义
  const mapComList = (ary) => {
    if (!ary || ary.length === 0) {
      return (
        <li>暂无组件</li>
      )
    }
    return ary.map((d, k) => {
      const { children } = d
      return (
        <li
          key={k}
          className={les.componentItem}
        >
          {d.name}
          {
            children
            ? <ul className={les.childListCom}>{mapComList(children)}</ul>
            : null
          }
        </li>
      )
    })
  }

  // 属性定义
  const propsOfComponentSelect = props

  return (
    <div className={les.container}>
      {/* 现选组件列表 */}
      <ul className={les.listCom}>{mapComList(templateList)}</ul>
      {/* 添加组件按钮 */}
      <Button
        onClick={showComponentSelect}
      >添加组件</Button>
      {/* 组件选择抽屉 */}
      <ComponentSelect {...propsOfComponentSelect} />
    </div>
  )
}

export default List
