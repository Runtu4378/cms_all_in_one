import { Button } from 'antd'
import les from './index.less'

const Detail = ({
  dispatch,
  list,
  item,
}) => {
  // 属性获取
  const {
    selectState,
    selectItem,
  } = item
  const {
    _id,
    html_proptypes,
    css_proptypes,
    js_proptypes,
  } = selectItem

  // 方法定义
  const filterPureData = (ary) => {
    return ary.map(d => {
      return {
        _id: d._id,
        com_id: d._id,
        children: (d.children && d.children.length > 0) ? filterPureData(d.children) : [],
      }
    })
  }
  const addComponent = () => {
    const payload = filterPureData(list)
    payload.push({
      com_id: _id,
      childrens: [],
    })
    dispatch({ type: 'siteEdit/setTemplate', payload })
  }
  
  // 遍历方法定义
  const mapPropsSettingLi = (ary) => {
    if (!ary || ary.length === 0) {
      return (
        <li>无属性</li>
      )
    }
    return ary.map(d => {
      return (
        <li
          key={d._id}
        >
          {'{'} name: <span className={les.value}>{d.name}</span>, defaultValue: <span className={les.value}>{d.defaultValue}</span>, dsec: <span className={les.value}>{d.dsec}</span> {'}'}
        </li>  
      )
    })
  }
  const mapPropsSettingBlock = (title, data) => {
    return (
      <div
        key={title}
        className={les.propLab}
      >
        <div className={les.propTypeTitle}>{title}</div>
        <ul className={les.propList}>{mapPropsSettingLi(data)}</ul>
      </div>
    )
  }

  return (
    <div className={les.detail}>
      {/* 组件属性 */}
      <div className={les.propSettingLab}>
        {
          selectState
          ? [
            mapPropsSettingBlock('html_proptypes', html_proptypes),
            mapPropsSettingBlock('css_proptypes', css_proptypes),
            mapPropsSettingBlock('js_proptypes', js_proptypes),
          ]
          : null
        }
      </div>
      {/* 组件预览 */}
      <div className={les.viewer}>
        <h4>组件预览（未完待续）</h4>
      </div>
      {/* 操作栏 */}
      <div className={les.actionLab}>
        <Button
          type="primary"
          onClick={addComponent}
        >添加</Button>
      </div>
    </div>
  )
}

export default Detail
