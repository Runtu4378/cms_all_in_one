import { Button } from 'antd'
import { Tab  } from 'components/layout'
import les from './index.less'
import ModalCreate from './components/modalCreate'

const List = ({
  dispatch,
  site,
}) => {
  const {
    list,
    createVisible,
  } = site

  // 方法定义
  // 显示创建站点弹窗
  const showCreate = () => {
    dispatch({ type: 'site/showCreate', show: true })
  }
  // 点击站点项，选择站点
  const selectSite = (payload) => {
    dispatch({ type: 'site/select', payload })
  }

  // 属性定义
  const propsOfModalCreate = {
    dispatch,
    createVisible,
  }

  // 遍历方法定义
  const ListItem = (d) => {
    return (
      <li
        key={d._id}
        className={les.item}
        onClick={() => selectSite(d)}
      >{d.name}</li>
    )
  }
  const mapList = (ary) => {
    return ary.map(li => ListItem(li))
  }

  return (
    <Tab
      title="站点列表"
      position="l"
      className={les.container}
    >
      {/* 站点列表 */}
      <ul className={les.list}>
        {mapList(list)}
      </ul>
      {/* 创建站点按钮 */}
      <Button
        type="primary"
        onClick={showCreate}
      >添加站点</Button>
      {/* 创建站点弹窗 */}
      {
        createVisible
        ? <ModalCreate {...propsOfModalCreate} />
        : null
      }
    </Tab>
  )
}

export default List
