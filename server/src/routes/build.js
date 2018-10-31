const express = require('express')
const router = express.Router()
const { dealRes, dealError } = require('../utils/dealWrap')
const builder = require('../../../builder/vue_builder')

router.post('/vue', (req, res) => {
  const {
    html_code,
    css_code,
    js_code,
  } = req.body
  const builder_process = new builder({
    html: html_code,
    css: css_code,
    js: js_code,
  })
  builder_process.start()
    .then(data => {
      dealRes(res, 200, data)
    })
    .catch(msg => {
      dealError(res, new Error(msg))
    })
})

module.exports = router
