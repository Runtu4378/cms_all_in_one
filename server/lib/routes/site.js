'use strict';

var express = require('express');
var router = express.Router();

var _require = require('../utils/dealWrap'),
    dealRes = _require.dealRes,
    dealError = _require.dealError;

var Site = require('../models/site');

// 获取列表
router.get('/', function (req, res) {
  Site.find().exec().then(function (data) {
    return dealRes(res, 200, data);
  }).catch(function (e) {
    return dealError(res, e);
  });
});

// 获取详情
router.get('/:_id', function (req, res) {
  var _id = req.params._id;

  Site.findById(_id).exec().then(function (data) {
    return dealRes(res, 200, data);
  }).catch(function (e) {
    return dealError(res, e);
  });
});

// 新增条目
router.post('/', function (req, res) {
  var name = req.body.name;

  Site.create({
    name: name
  }).then(function (data) {
    return dealRes(res, 200, data);
  }).catch(function (e) {
    return dealError(res, e);
  });
});

module.exports = router;
//# sourceMappingURL=site.js.map
