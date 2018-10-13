import { connect } from 'dva'
import Header from '../header'
import Footer from '../footer'
import les from './index.less'

const Layout = ({
  routing = {
    location: {},
  },
  children,
}) => {
  const { pathname } = routing.location
  return (
    <div className={les.container}>
      <Header pathname={pathname} />
      <div className={les.body}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default connect(({ routing }) => ({ routing }))(Layout)
