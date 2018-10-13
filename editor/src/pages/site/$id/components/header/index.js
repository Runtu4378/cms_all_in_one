import les from './index.less'

const Header = ({
  siteEdit,
}) => {
  // 属性获取
  const {
    siteDetail,
  } = siteEdit
  const {
    name,
  } = siteDetail

  return (
    <div className={les.container}>
      <div className={les.siteName}>{name}</div>
    </div>
  )
}

export default Header
