import les from './index.less'

const Wrapper = ({
  title,
  children,
}) => {
  return (
    <div className={les.wrapper}>
      <div className={les.title}>{title}</div>
      <div>{children}</div>
    </div>
  )
}

export default Wrapper
