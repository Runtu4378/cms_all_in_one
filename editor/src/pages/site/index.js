import { connect } from 'dva'
import Layout from 'components/layout/page'
import les from './index.less'
import List from './components/list'
import EditArea from './components/editArea'

const Page = ({
  dispatch,
  loading,
  site,
}) => {
  // 属性定义
  const propsOfList = {
    dispatch,
    loading,
    site,
  }
  const propsOfEditArea = {
    dispatch,
    loading,
    site,
  }

  return (
    <Layout>
      <div className={les.container}>
        <List {...propsOfList} />
        <EditArea {...propsOfEditArea} />
      </div>
    </Layout>
  )
}

export default connect(({ loading, site }) => ({ loading, site }))(Page)
