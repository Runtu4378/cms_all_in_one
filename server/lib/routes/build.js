'use strict';

var express = require('express');
var router = express.Router();

var _require = require('../utils/dealWrap'),
    dealRes = _require.dealRes,
    dealError = _require.dealError;

var builder = require('../../../builder/vue_builder');

router.post('/vue', function (req, res) {
  var _req$body = req.body,
      html_code = _req$body.html_code,
      css_code = _req$body.css_code,
      js_code = _req$body.js_code;

  var builder_process = new builder({
    html: html_code,
    css: css_code,
    js: js_code
  });
  builder_process.start().then(function (data) {
    dealRes(res, 200, data);
  }).catch(function (msg) {
    dealError(res, new Error(msg));
  });
});

module.exports = router;
//# sourceMappingURL=build.js.map
