const Details = ({
  siteEdit,
}) => {
  // 获取属性
  const {
    routeEditItem,
  } = siteEdit
  const {
    name,
  } = routeEditItem

  return (
    <div>
      <div>name: {name}</div>
    </div>
  )
}

export default Details
