import { Icon } from 'antd'
import { SelectTab } from 'components/layout'
import les from './index.less'
import { Details, ComponentSetting } from './components'

const Detail = ({
  dispatch,
  siteEdit,
}) => {
  // 属性获取
  const {
    routeEditState: active,
  } = siteEdit

  // 属性定义
  const propsOfDetails = {
    dispatch,
    siteEdit,
  }
  const propsOfComponentSetting = {
    dispatch,
    siteEdit,
  }
  const propsOfSelectTab = {
    className: les.container,
    onChange: (key) => { console.log(key) },
    contents: [
      {
        tab: '路由详情',
        key: 'details',
        content: (<Details {...propsOfDetails} />),
      },
      {
        tab: '模板编辑',
        key: 'work',
        content: (<ComponentSetting {...propsOfComponentSetting} />),
      },
    ],
  }

  if (active) {
    return (
      <SelectTab {...propsOfSelectTab} />
    )
  }
  return (
    <div className={les.noContent}>
      <Icon type="warning" theme="outlined" />
      未选择路由
    </div>
  )
}

export default Detail
