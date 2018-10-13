import les from './index.less'
import {
  List,
  Viewer,
} from './components'

const Setting = (props) => {
  // 属性获取

  // 属性定义
  const propsOfList = props
  const propsOfViewer = {
    htmlStr: props.siteEdit.htmlStr,
  }

  return (
    <div className={les.container}>
      {/* 组件列表 */}
      <List {...propsOfList} />
      {/* 模板预览 */}
      <Viewer {...propsOfViewer} />
    </div>
  )
}

export default Setting
