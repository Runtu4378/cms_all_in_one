import PropTypes from 'prop-types'
import les from './index.less'

// [position] 的说明
// 九宫格式
// 1 2 3
// 4 5 6
// 7 8 9
//
// 横列表式
// l m ... m r

const Tab = ({
  title,
  position,
  className,
  styles,
  noMargin,
  children,
}) => {
  const baseClass = `
  ${les.container} 
  ${className || ''} 
  ${position ? les[`sudoku_${position}`] : ''}
  ${noMargin ? les.noMargin : ''}
  `
  return (
    <div className={baseClass} style={styles}>
      {/* 标题区域 */}
      {
        title
        ? <div className={les.title}>{title}</div>
        : null
      }
      {/* 内容区域 */}
      <div className={les.content}>{children}</div>
    </div>
  )
}

Tab.defaultProps = {
  title: null,
  className: null,
  styles: null,
  position: '5',
  noMargin: false,
  children: null,
}

Tab.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  styles: PropTypes.object,
  position: PropTypes.oneOf([
    '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'l', 'm', 'r',
  ]),
  noMargin: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
}

export default Tab
