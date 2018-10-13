import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import les from './index.less'

const TabPane = Tabs.TabPane

const SelectTab = ({
  contents,
  className,
  ...props
}) => {
  // 属性合并
  const newClassName = `${les.tab} ${className}`

  const mapChild = (ary) => {
    if (ary && ary.length) {
      return ary.map(i => {
        const { content, ...prop } = i
        return (
          <TabPane {...prop}>{content}</TabPane>
        )
      })
    }
    return null
  }
  return (
    <Tabs
      {...props}
      className={newClassName}
    >
      {mapChild(contents)}
    </Tabs>
  )
}

SelectTab.defaultProps = {
  contents: [],
}

SelectTab.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.object),
}

export default SelectTab
