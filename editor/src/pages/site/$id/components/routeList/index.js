import { Icon, Button } from 'antd'
import { Tab } from 'components/layout'
import les from './index.less'

const List = ({
  dispatch,
  list,
  selectState,
  selectItem,
}) => {
  // 属性获取

  // 方法定义
  const selectRoute = (target) => {
    dispatch({
      type: 'siteEdit/intoEditRoute',
      payload: target,
    })
  }

  // 渲染方法定义
  const mapPageList = (ary) => {
    return ary.map(d => {
      return (
        <li
          key={d._id}
          className={les.pageCon}
        >
          <div className={les.context}>
            <Icon type="file" /> {d.path}
          </div>
        </li>
      )
    })
  }
  const mapRouteList = (ary) => {
    return ary.map((d) => {
      return (
        <li
          key={d._id}
          className={`${les.listItem} ${(selectState&&selectItem._id === d._id) ? les.active : '' }`}
        >
          <div className={les.content}>
            <div className={les.title}>{d.name}</div>
            <div>
              <Button
                onClick={() => selectRoute(d)}
              >编辑</Button>
            </div>
          </div>
          <ul className={les.pageList}>{mapPageList(d.pages)}</ul>
          <ul className={les.childRoute}>{mapRouteList([])}</ul>
        </li>
      )
    })
  }

  return (
    <Tab
      title="路由列表"
      position="l"
      className={les.container}
    >
      <div>
        <ul className={les.listCon}>{mapRouteList(list)}</ul>
      </div>
    </Tab>
  )
}

export default List
