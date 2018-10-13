import { routerRedux } from 'dva/router'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import { Tab  } from 'components/layout'
import les from './index.less'
import ModalCreate from '../modalCreate'

const List = ({
  dispatch,
  list,
  viewItem,
  createVisible,
}) => {
  // 选择组件的函数
  const onSelect = (target) => {
    dispatch({ type: 'component/view', payload: target })
  }
  // 编辑组件的函数
  const onEdit = (id) => {
    dispatch(routerRedux.push(`/editor/${id}`))
  }
  // 显示创建组件模板函数
  const showCreate = () => {
    dispatch({ type: 'component/showCreate', show: true })
  }

  const mapListItem = (ary) => {
    if (!ary || ary.length === 0) {
      return <div className={les.nothing}>暂无组件</div>
    }
    return ary.map((d, idx) => {
      return (
        <li
          key={idx}
          className={`${les.item} ${(viewItem && viewItem._id === d._id) ? les.active : ''}`}
          onClick={() => onSelect(d)}
        >
          <div className={les.name}>{d.name}</div>
          <Button
            icon="edit"
            className={les.editBtn}
            onClick={() => onEdit(d._id)}
          />
        </li>
      )
    })
  }
  
  const propsOfModalCreate = {
    dispatch,
    createVisible,
  }

  return (
    <Tab
      title="组件模板列表"
      position="l"
      className={les.container}
    >
      <ul className={les.list}>{mapListItem(list)}</ul>
      <Button
        className={les.btn}
        type="primary"
        onClick={showCreate}
      >新增组件模板</Button>
      {/* 新增组件模板弹窗 */}
      {createVisible ? <ModalCreate {...propsOfModalCreate} /> : null}
    </Tab>
  )
}

List.defaultProps = {
}

List.propTypes = {
  dispatch: PropTypes.func,
  List: PropTypes.arrayOf(PropTypes.object),
  viewIrem: PropTypes.object,
  createVisible: PropTypes.bool,  // 创建弹窗的可视状态
}

export default List
