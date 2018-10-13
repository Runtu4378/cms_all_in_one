import { Button } from 'antd'
import Wrapper from '../infoWrapper'
import List from './components/list'
import ModalCreateRoute from './components/routeCreate'

const RoutesInfo = ({
  dispatch,
  site,
}) => {
  // 属性获取
  const {
    selectItem,
    routeCreateVisible,
  } = site

  // 属性定义
  const propsOfList = {
    dispatch,
    ...site,
  }
  const propsOfMopdalCreateRoute = {
    dispatch,
    visible: routeCreateVisible,
    target: selectItem,
  }

  // 方法定义
  const showCreateRoute = () => {
    dispatch({ type: 'site/showCreateRoute', show: true })
  }
  return (
    <Wrapper
      title="路由列表"
    >
      {/* 路由列表 */}
      <List {...propsOfList}/>
      <Button
        onClick={showCreateRoute}
      >新增路由</Button>
      {
        routeCreateVisible
        ? <ModalCreateRoute {...propsOfMopdalCreateRoute} />
        : null
      }
    </Wrapper>
  )
}

export default RoutesInfo
