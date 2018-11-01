const initTemplate = (target) => {
  if (!target) {
    throw new Error('target is need')
  } else if (target instanceof Array) {
    return `<div>${target.map(d => initTemplate(d)).join('')}</div>`
  }
  const { name, children } = target
  let childStr = ''
  if (children && children.length) {
    for (let i = 0; i < children.length; i += 1) {
      childStr += initTemplate(children)
    }
  }
  return `<${name}>${childStr}</${name}>`
}

export default initTemplate
