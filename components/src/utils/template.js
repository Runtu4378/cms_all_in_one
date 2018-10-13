export default class Temp {
  templateName = null // 模板名

  prototype = null // 变量格式

  props = null // 变量值

  comList = null // 组件模板函数列表
  comConfig = null // 组件树配置

  /**
   * 模板类
   * @param {string} templateName 模板名
   */
  constructor(templateName) {
    this.templateName = templateName
  }

  /**
   * 设置模板结构
   */
  set() {}

  /**
   * 根据组件名和组件列表获取组件实例
   * @param {array} comList 组件实例列表
   * @param {string} componentNname 组件名
   */
  mapCom(comList, componentNname) {
    if (!comList || !(comList instanceof Array)) {
      throw new Error('tyeof comList error, should be object')
    } else if (!componentNname) {
      throw new Error('componentNname is required')
    }
    this.comList = comList
  }

  /**
   * 遍历组件树，返回组件树渲染结果
   * @param {array} list 组件实例列表
   * @param {*} config 组件树配置
   * @returns {string} 渲染结果
   */
  mapTree(list, config) {
    const { componentName, props, children } = config
    const baseFunc = this.mapCom(list, componentName)
    let childrenAry = []
    if (children) {
     childrenAry = mapTree(list, config) 
    }
    return baseFunc({ ...props, children: childrenAry })
  }

  // 渲染函数
  render(props) {
    const DOM = this.mapTree(this.comList, this.comConfig)
    // 遍历组件树
    return { vars: props, DOM }
  }
}
