import { Tab } from 'components/layout'
import les from './index.less'
import BaseInfo from './components/baseInfo'
import RoutesInfo from './components/routesInfo'

const EditArea = ({
  dispatch,
  site,
}) => {
  const {
    selectItem,
  } = site

  // 属性定义
  const propsOfBaseInfo = {
    dispatch,
    ...selectItem,
  }
  const propsOfRouteInfo = {
    dispatch,
    site,
  }

  // 遍历方法定义
  const noContent = () => {
    return (
      <div className={les.noContent}>未选择站点</div>
    )
  }

  return (
    <Tab
      title="站点属性"
      position="r"
      className={les.container}
    >
      {/* 基本信息 */}
      {
        selectItem
        ? [
            <BaseInfo key="baseInfo" {...propsOfBaseInfo} />,
            <RoutesInfo key="routesInfo" {...propsOfRouteInfo} />,
          ]
        : noContent()
      }
    </Tab>
  )
}

export default EditArea
