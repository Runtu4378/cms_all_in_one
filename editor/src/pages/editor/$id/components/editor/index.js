import { Spin } from 'antd'
import { Tab } from 'components/layout'
import Editor from './createPan'
import les from './index.less'

const EditorPan = ({
  loading,
  title,
  height,
  width,
  editor = {},
}) => {
  return (
    <Tab
      title={title}
      position="1"
      noMargin={true}
      styles={{
        height,
        width,
      }}
    >
      <div className={les.wrapInner}>
        {
          loading
          ? <Spin />
          : <Editor {...editor}/>
        }
      </div>
    </Tab>
  )
}

export default EditorPan
