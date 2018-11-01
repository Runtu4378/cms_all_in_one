/**
 * 处理变量注入
 * @param {string} type 处理类型
 * @param {*} code 代码原文
 * @param {*} props 变量
 */
const func = (type, code, props) => {
  if (type === 'js') {
    // 注入js变量
    const keyAry = Object.keys(props)
    let keyStr = ''
    for (let i = 0; i < keyAry.length; i += 1) {
      const k = keyAry[i]
      if (k === 'childrens') {
        continue
      }
      keyStr += `var ${k}="${props[k]}";`
    }
    if (props['childrens']) {
      return `${keyStr}${code}${props['childrens'].join('')}`
    }
    return `${keyStr}${code}`
  } else if (type === 'css') {
    // 注入less变量
    const keyAry = Object.keys(props)
    let keyStr = ''
    for (let i = 0; i < keyAry.length; i += 1) {
      const k = keyAry[i]
      if (k === 'childrens') {
        continue
      }
      keyStr += `@${k}: ${props[k]};`
    }
    if (props['childrens']) {
      return `${keyStr}${code}${props['childrens'].join('')}`
    }
    return `${keyStr}${code}`
  }
  return code
}

export default func
