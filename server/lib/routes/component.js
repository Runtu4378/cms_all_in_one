'use strict';

var express = require('express');
var router = express.Router();
var Component = require('../models/component');

var _require = require('../utils/dealWrap'),
    dealRes = _require.dealRes,
    dealError = _require.dealError;

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


router.get('/', function (req, res) {
  Component.find().exec().then(function (data) {
    return dealRes(res, 200, data);
  }).catch(function (e) {
    return dealError(res, e);
  });
});

// 获取详情
router.get('/:_id', function (req, res) {
  var _id = req.params._id;

  Component.findById(_id).exec().then(function (data) {
    return dealRes(res, 200, data);
  }).catch(function (e) {
    return dealError(res, e);
  });
});

// 新增条目
router.post('/', function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      type = _req$body.type,
      code_type = _req$body.code_type;

  Component.create({
    name: name,
    type: type,
    code_type: code_type,
    html_code: '<div class="hello">Hello world</div>\r',
    html_proptypes: [],
    html_transformer: 'artm',
    css_code: '@color: #f00;\r\r.hello {color: @color;}\r',
    css_proptypes: [],
    css_transformer: 'less',
    js_code: 'console.log("hello world");\r',
    js_proptypes: [],
    js_transformer: 'js'
  }).then(function (data) {
    return dealRes(res, 200, data);
  }).catch(function (e) {
    return dealError(res, e);
  });
});

// 更新条目
router.put('/:_id', function (req, res) {
  var _id = req.params._id;
  var _req$body2 = req.body,
      name = _req$body2.name,
      html_code = _req$body2.html_code,
      html_proptypes = _req$body2.html_proptypes,
      css_code = _req$body2.css_code,
      css_proptypes = _req$body2.css_proptypes,
      js_code = _req$body2.js_code,
      js_proptypes = _req$body2.js_proptypes;

  Component.findByIdAndUpdate({ _id: _id }, {
    name: name,
    html_code: html_code,
    html_proptypes: html_proptypes,
    css_code: css_code,
    css_proptypes: css_proptypes,
    js_code: js_code,
    js_proptypes: js_proptypes
  }).exec().then(function (data) {
    return dealRes(res, 200, data);
  }).catch(function (e) {
    return dealError(res, e);
  });
});

// 删除条目
router.delete('/:id', function (req, res) {
  var id = req.params.id;

  Component.remove({ _id: id }).exec().then(function (data) {
    return dealRes(res, 200, data);
  }).catch(function (e) {
    return dealError(res, e);
  });
});

module.exports = router;
//# sourceMappingURL=component.js.map
