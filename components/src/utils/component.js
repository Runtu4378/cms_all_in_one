export default class Com {
  componentName = null  // 组件名

  propType = null  // 变量格式
  
  props = null  // 变量值
  
  Dom = null // 组件模板函数

  render = null // 渲染函数

  /**
   * 组建类
   * @param {string} componentName 模板名
   * @param {function} domFunc 模板渲染函数
   * @param {*} propType 模板变量格式
   */
  constructor(componentName, domFunc, propType) {
    this.componentName = componentName
    this.Dom = domFunc
    this.propType = propType
    // 生成默认变量值
    const propsAry = Object.keys(propType)
    const props = {}
    for (let i = 0; i < propsAry.length; i += 1) {
      const tar = propsAry[i]
      props[tar] = propType[tar]['defaultValue'] === undefined
      ? null
      : propType[tar]['defaultValue']
    }
    this.props = props
    // 渲染函数
    this.render = function(props) {
      if (typeof this.Dom !== 'function') {
        throw new Error('typeof Dom is not function')
      }
      return this.Dom({ ...this.props, ...props })
    }
  }
}
