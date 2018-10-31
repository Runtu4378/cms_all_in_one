const webpack = require("webpack")
const path = require('path')
const fs = require('fs-extra')
const confDev = require('./webpack.dev.conf')

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

  start() {
    const now = Date.parse(new Date())
    const MODULE_SEARCH_DIR = path.resolve(__dirname, '../node_modules/')
    const TEMP_DIR = path.resolve(__dirname, '../temp')
    const ENTRY = path.resolve(TEMP_DIR, `${now}.vue`)
    const OUTPUT = `${now}.pud.js`
    // save temp file
    const code = `
  <template>
    ${this.template}
  </template>

  <script>
  ${this.script}
  </script>

  <style lang="less" module>
  ${this.style}
  </style>
`
    fs.ensureDirSync(TEMP_DIR)
    fs.writeFileSync(ENTRY, code, 'utf-8')
    const paths = {
      MODULE_SEARCH_DIR,
      TEMP_DIR,
      ENTRY,
      OUTPUT,
    }
    const conf = confDev({ paths })
    return new Promise((resolve, reject) => {
      webpack(conf, (err, stats) => {
        if (err || stats.hasErrors()) {
          // Handle errors here
          const errMsg = err || stats.compilation.errors
          console.error(errMsg)
          reject(errMsg)
        }
        // Done processing
        const resCode = fs.readFileSync(
          path.resolve(TEMP_DIR, OUTPUT),
          'utf-8',
        )
        resolve(JSON.stringify(resCode))
      })
    })
  }
}

module.exports = Builder
