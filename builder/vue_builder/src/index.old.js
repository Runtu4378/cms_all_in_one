const {
  parse,
  compileTemplate,
  compileStyle,
} = require('@vue/component-compiler-utils')


class Builder {
  /** 初始化对象 */
  constructor({
    html,
    css,
    js,
  }) {
    this.template = html
    this.style = css
    this.script = js
  }
  //

  start () {
    const code = `
<template>
  <div class="mk">
    {{ text }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'aa'
    }
  }
}
</script>

<style lang="less" scoped>
.mk {
  color: #f00;
}
</style>
`
    const codeParse = parse({
      source: code,
      compiler: require('vue-template-compiler'),
      needMap: false,
    })
    console.log(codeParse)
    const {
      template,
      script,
      styles,
    } = codeParse
    const complied = compileTemplate({
      source: template.content,
      compiler: require('vue-template-compiler'),
    })
    console.log(complied)
    return {
      html: this.template,
      css: this.style,
      js: this.script,
    }
  }
}

module.exports = Builder
