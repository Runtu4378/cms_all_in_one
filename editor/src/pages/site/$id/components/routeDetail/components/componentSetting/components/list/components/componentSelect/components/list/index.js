import les from './index.less'

const List = ({
  dispatch,
  item,
}) => {
  // 获取属性
  const {
    list,
    selectState,
    selectItem,
  } = item

  // 方法定义
  const onListClick = (payload) => {
    dispatch({ type: 'siteEdit/componentSelect', payload })
  }

  // 渲染方法定义
  const mapComponentList = (ary) => {
    if (!ary || ary.length === 0) {
      return (
        <li>暂无组件</li>
      )
    }
    return ary.map(d => {
      return (
        <li
          key={d._id}
          className={
            les.listItem +
            ' ' +
            (selectState && selectItem._id === d._id ? les.active : '')
          }
          onClick={() => onListClick(d)}
        >{d.name}</li>
      )
    })
  }

  return (
    <ul className={les.list}>{mapComponentList(list)}</ul>
  )
}

export default List
