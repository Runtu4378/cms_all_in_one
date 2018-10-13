import { connect } from 'dva'
import Header from './components/header'
import TabLeft from './components/tabLeft'
import TabRight from './components/tabRight'
import les from './index.less'

const Page = ({
  dispatch,
  loading,
  editor,
}) => {
  const {
    autoRun,
  } = editor

  const propsOfHeader = {
    dispatch,
    autoRun,
  }
  const propsOfTabLeft = {
    dispatch,
    loading,
    editor,
  }
  const propsOfTabRight = {
    dispatch,
    editor,
  }

  return (
    <div className={les.container}>
      <Header {...propsOfHeader} />
      <div className={les.body}>
        <TabLeft {...propsOfTabLeft} />
        <TabRight {...propsOfTabRight} />
      </div>
    </div>
  )
}

export default connect(({ loading, editor }) => ({ loading, editor }))(Page)
