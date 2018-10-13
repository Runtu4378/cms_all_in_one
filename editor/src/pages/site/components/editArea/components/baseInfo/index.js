import { Button } from 'antd'
import Wrapper from '../infoWrapper'

const BaseInfo = ({
  dispatch,
  name,
}) => {
  // 方法定义
  const intoEdit = () => {
    dispatch({ type: 'site/linkToEdit' })
  }

  return (
    <Wrapper
      title="基本信息"
    >
      <div>站点名：{name}</div>
      <div>
        <Button
          onClick={intoEdit}
        >进入站点编辑界面</Button>
      </div>
    </Wrapper>
  )
}

export default BaseInfo
