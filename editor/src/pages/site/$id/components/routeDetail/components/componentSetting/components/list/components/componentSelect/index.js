import { Drawer } from 'antd'
import les from './index.less'
import {
  List,
  Detail,
} from './components'

const ComponentSelect = (props) => {
  // 属性获取
  const {
    dispatch,
    siteEdit,
  } = props
  const {
    templateList,

    componentSelectState,
    componentSelectData,
  } = siteEdit

  // 方法定义
  const hideComponentSelect = () => {
    dispatch({ type: 'siteEdit/switchComponentSelect', show: false })
  }

  // 属性定义
  const propsOfDrawer = {
    title: '选择组件',
    width: '70%',
    placement: 'left',
    wrapClassName: les.drawer,
    visible: componentSelectState,
    destroyOnClose: true,
    onClose: hideComponentSelect,
  }
  const propOfList = {
    dispatch,
    item: componentSelectData,
  }
  const propsOfDetail = {
    dispatch,
    list: templateList,
    item: componentSelectData,
  }

  return (
    <Drawer
      {...propsOfDrawer}
    >
      <div className={les.container}>
        {/* 组件列表 */}
        <List {...propOfList} />
        {/* 组件预览 */}
        <Detail {...propsOfDetail} />
      </div>
    </Drawer>
  )
}

export default ComponentSelect
