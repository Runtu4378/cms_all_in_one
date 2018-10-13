import les from './index.less'
import Output from '../output'
import PropSet from '../propSet'
import ConsoleCon from '../console'

const TabRight = ({
  dispatch,
  editor,
}) => {
  const propsOfOutput = {
    htmlStr: editor.htmlStr,
  }
  const propsOfPropSet = {
    dispatch,
    editor,
  }

  return (
    <div className={les.container}>
      <div className={les.topArea}>
        {/* 预览窗格 */}
        <Output {...propsOfOutput} />
        {/* 传参窗格 */}
        <PropSet {...propsOfPropSet} />
      </div>
      <div className={les.bottomArea}>
        {/* console窗格 */}
        <ConsoleCon />
      </div>
    </div>
  )
}

export default TabRight
