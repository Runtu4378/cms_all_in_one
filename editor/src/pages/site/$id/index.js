import { connect } from 'dva'
import {
  Header,
  RouteList,
  RouteDetail,
} from './components'
import les from './index.less'

const Page = ({
  dispatch,
  siteEdit,
}) => {
  // 属性获取
  const {
    routeList,
    routeEditState,
    routeEditItem,
  } = siteEdit

  // 属性定义
  const porpsOfHeader = {
    siteEdit,
  }
  const propsOfRouteList = {
    dispatch,
    list: routeList,

    selectState: routeEditState,
    selectItem: routeEditItem,
  }
  const propsOfRouteDetail = {
    dispatch,
    siteEdit,
  }

  return (
    <div className={les.container}>
      <Header {...porpsOfHeader} />
      <div className={les.content}>
        <RouteList {...propsOfRouteList} />
        <RouteDetail {...propsOfRouteDetail} />
      </div>
    </div>
  )
}

export default connect(({ loading, siteEdit }) => ({ loading, siteEdit}))(Page)
