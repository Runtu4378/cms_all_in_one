import { Button } from 'antd'
import les from './index.less'
import Tree from '../tree'
import RouteEdit from '../routeEdit'

const List = ({
  dispatch,
  selectItem,
  routeEditVisible,
  routeEditItem,
}) => {
  // 属性获取
  const routes = selectItem ? selectItem.routes : []

  // 方法定义
  const showEdit = (payload) => {
    dispatch({ type: 'site/showEditRoute', payload })
  }

  // 渲染方法定义
  const mapTree = (ary) => {
    return ary.map(d => {
      const { children } = d
      return {
        ...d,
        children: children ? mapTree(children) : [],
        title: initTreeDom(d),
      }
    })
  }
  const initTreeDom = (target) => {
    const {
      name,
      path,
    } = target
    return (
      <div className={les.treeDom}>
        <div className={les.title}>{name} - {path}</div>
        <div className={les.btnArea}>
          <Button
            type="primary"
            onClick={() => showEdit(target)}
          >编辑</Button>
          <Button type="primary">删除</Button>
          <Button type="primary">新增子节点</Button>
        </div>
      </div>
    )
  }

  // 属性定义
  const list = mapTree(routes)
  const propsOfTree = {
    value: list,
  }
  const propsOfRouteEdit = {
    dispatch,
    visible: routeEditVisible,
    item: routeEditItem,
  }

  return (
    <div className={les.container}>
      {
        selectItem
        ? <Tree {...propsOfTree} />
        : null
      }
      <RouteEdit {...propsOfRouteEdit} />
    </div>
  )
}

export default List
