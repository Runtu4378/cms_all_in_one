import { connect } from 'dva'
import Layout from 'components/layout/page'
import les from './index.less'
import List from './components/list'
import Viewer from './components/viewer'
import EditArea from './components/editArea'

const Page = ({
  dispatch,
  component,
  // loading,
}) => {
  const {
    list,
    viewItem,
    createVisible,
  } = component

  const propsOfList = {
    dispatch,
    list,
    viewItem,
    createVisible,
  }

  return (
    <Layout>
      <div className={les.container}>
        {/* 组件列表 */}
        <List {...propsOfList} />
        {/* 组件预览区域 */}
        <Viewer />
        {/* 组件属性栏 */}
        <EditArea />
      </div>
    </Layout>
  )
}

export default connect(({ component, loading }) => ({ component, loading }))(Page)
