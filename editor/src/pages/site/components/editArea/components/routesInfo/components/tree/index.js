import * as React from 'react'
import './index.less'

const separator = '-'

const Tree = ({
  value,
}) => {

  /**
  * 生成节点索引
  * @param {number} pKey 父节点key
  * @param {number} cKey 子节点key
  */
 const initKey = (pKey, cKey) => {
   if (pKey) {
     return `${pKey}${separator}${cKey}`
   } else {
     return `${cKey}`
   }
 }
  /**
   * 渲染树节点
   * @param {*} target 节点对象
   * @param {number} key 节点的key
   * @param {number} parentKey 父节点的key
   */
  const renderTreeNode = (target, key, parentKey) => {
    const {
      title,
      children,
    } = target
    const nodeKey = initKey(parentKey, key)
    return (
      <li
        key={nodeKey}
        className="cms-children-node"
      >
        {/* 展开选择器 */}
        {/* <span
          className="cms-tree-switcher"
        ></span> */}
        {/* 节点内容 */}
        <div className="cms-tree-node-content-wrapper">{title}</div>
        {/* 子节点树 */}
        {
          children
          ? (
              <ul className="cms-tree-child-tree">
              {children.map((d, k) => renderTreeNode(d, k, nodeKey))}
              </ul>
            )
          : null
        }
      </li>
    )
  }

  return (
    <ul className="cms-tree">
      {value.map((d, k) => renderTreeNode(d, k))}
    </ul>
  )
}

export default Tree
