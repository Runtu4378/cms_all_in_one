import { Tooltip, Button } from 'antd'
import les from './index.less'

const Header = ({
  dispatch,
  autoRun,
}) => {
  const mapMenus = (list) => {
    return list.map((d) => {
      return (
        <Tooltip key={d.key} title={d.label} placement="bottom">
          <li className={les.innerDiv}>
            {/* 纯图标按钮或是文字按钮 */}
            {d.inner || null}
          </li>
        </Tooltip>
      )
    })
  }

  const menuLeft = [
    {
      key: 'exit',
      label: '退出编辑',
      inner: (
        <Button
          size="small"
          icon="close"
          onClick={() => {
            console.log('1')
            dispatch({ type: 'editor/back' })
          }}
        />
      ),
    },
  ]

  const menuRight = [
    {
      key: 'autoRun',
      label: '自动运行',
      inner: (
        <Button
          size="small"
          type={autoRun ? 'primary' : ''}
          icon={'eye-o'}
          onClick={() => {
            dispatch({ type: 'editor/changeAutoRun'})
          }}
        />
      ),
    },
    {
      key: 'run',
      label: '运行',
      inner: (
        <Button
          size="small"
          icon="reload"
          onClick={() => {
            dispatch({ type: 'editor/buildComponent'})
          }}
        />
      ),
    },
    {
      key: 'save',
      label: '保存',
      inner: (
        <Button
          size="small"
          icon="save"
          onClick={() => {
            dispatch({ type: 'editor/save'})
          }}
        />
      ),
    },
  ]

  return (
    <div className={les.container}>
      <ul
        className={les.nav}
      >{mapMenus(menuLeft)}</ul>
      <div className={les.mid}></div>
      <ul
        className={les.nav}
      >{mapMenus(menuRight)}</ul>
    </div>
  )
}

export default Header
