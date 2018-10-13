import { connect } from 'dva'
import Layout from 'components/layout/page'
import List from './components/list'
import les from './index.less'

const Page = () => {

  return (
    <Layout>
      <div className={les.container}>
        <List />
      </div>
    </Layout>
  )
}

export default connect(({ loading }) => ({ loading }))(Page)
