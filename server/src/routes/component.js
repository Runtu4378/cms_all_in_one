const express = require('express')
const router = express.Router()
const Component = require('../models/component')
const { dealRes, dealError } = require('../utils/dealWrap')

// 将JavaScript 代码字符化的函数
// const javascript = function(value) {
//   // const isArraySel = $("#arrays-sel").prop("checked");
//   const isArraySel = false
//   const htmlArr = value.replace(/\\/g, "\\\\").replace(/\\/g, "\\/").replace(/\'/g, "\\\'").replace(/\"/g, "\\\"").split('\n')
//   const len = htmlArr.length
//   const outArr = []
//   jQuery.each(htmlArr, function (index, value) {
//     if (value !== "") {
//       if (index === len - 1) {
//         outArr.push("\"" + value + "\";");
//       } else {
//         outArr.push("\"" + value + "\"+\n");
//       }
//     }
//   });
//   return outArr.join("");
// }

// 获取列表
router.get('/', (req, res) => {
  Component.find().exec()
    .then(data => dealRes(res, 200, data))
    .catch(e => dealError(res, e))
})

// 获取详情
router.get('/:_id', (req, res) => {
  const { _id } = req.params
  Component.findById(_id).exec()
    .then(data => dealRes(res, 200, data))
    .catch(e => dealError(res, e))
})

// 新增条目
router.post('/', (req, res) => {
  const { name, type, code_type } = req.body
  Component.create({
    name,
    type,
    code_type,
    html_code: '<div class="hello">Hello world</div>\r',
    html_proptypes: [],
    html_transformer: 'artm',
    css_code: '@color: #f00;\r\r.hello {color: @color;}\r',
    css_proptypes: [],
    css_transformer: 'less',
    js_code: 'console.log("hello world");\r',
    js_proptypes: [],
    js_transformer: 'js',
  })
    .then(data => dealRes(res, 200, data))
    .catch(e => dealError(res, e))
})

// 更新条目
router.put('/:_id', (req, res) => {
  const { _id } = req.params
  const {
    name,
    html_code,
    html_proptypes,
    css_code,
    css_proptypes,
    js_code,
    js_proptypes,
  } = req.body
  Component.findByIdAndUpdate({ _id }, {
    name,
    html_code,
    html_proptypes,
    css_code,
    css_proptypes,
    js_code,
    js_proptypes,
  }).exec()
    .then(data => dealRes(res, 200, data))
    .catch(e => dealError(res, e))
})

// 删除条目
router.delete('/:id', (req, res) => {
  const { id } = req.params
  Component.remove({ _id: id }).exec()
    .then(data => dealRes(res, 200, data))
    .catch(e => dealError(res, e))
})

module.exports = router
