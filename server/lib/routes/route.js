'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

var _require = require('../utils/dealWrap'),
    dealRes = _require.dealRes,
    dealError = _require.dealError;

var Route = require('../models/route');
var Component = require('../models/component');

/**
 * 将路由数组转换为路由数组树（非纯函数）
 * @param {Array} ary 被遍历数组
 * @param {*} pid 父路由id
 */
var initRouteTree = function initRouteTree(ary, pid) {
  var res = [];
  for (var i = 0; i < ary.length; i += 1) {
    var target = ary[i].toObject(); // 数据对象要 toObject() 才能修改
    var _id = target._id,
        parent_id = target.parent_id;

    if (parent_id === pid) {
      ary.splice(i, 1);
      i -= 1; // i 不回退一位的话会跳过一次遍历
      target.children = initRouteTree(ary, _id);
      res.push(target);
    }
  }
  return res;
};

/**
 * 遍历数组，提取id数组
 * @param {Array} ary 进行提取的数据数组
 * @param {Array} baseVal 现有的id数组
 */
var filterComponentIds = function filterComponentIds(ary) {
  var baseVal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var baseIds = [].concat((0, _toConsumableArray3.default)(baseVal));
  var ids = [];
  for (var i = 0; i < ary.length; i += 1) {
    var _ary$i = ary[i],
        com_id = _ary$i.com_id,
        children = _ary$i.children;

    if (baseIds.indexOf(com_id) === -1) {
      baseIds.push(com_id);
      ids.push(com_id);
    }
    if (children && children.length) {
      ids = ids.concat(filterComponentIds(children, ids));
    }
  }
  return ids;
};

/**
 * 根据传入键值和要匹配的键值的值遍历对象数组，返回匹配到的第一个对象，如无匹配项返回false
 * @param {any} ary 要遍历的对象数组
 * @param {string} key 匹配的键值名
 * @param {any} keyValue 要匹配的键值的值
 */
var findTarget = function findTarget(ary, key, keyValue) {
  for (var i = 0; i < ary.length; i += 1) {
    if (ary[i][key].equals(keyValue)) {
      // 生成对象副本，而非引用
      return (0, _extends3.default)({}, ary[i]);
    }
  }
  return false;
};

/**
 * 根据树结构数组提取组件数组，返回组件树
 * @param {any} tree 树数组
 * @param {any} comList 组件数组
 */
var turnTreeToComtree = function turnTreeToComtree(tree, comList) {
  var res = [];
  for (var i = 0; i < tree.length; i += 1) {
    var target = tree[i];
    console.log(target);
    var com_id = target.com_id,
        children = target.children;

    var component = findTarget(comList, '_id', com_id);
    if (!component) {
      throw new Error('can\' t find patch component');
    }
    if (children && children.length) {
      console.log('had children');
      component.children = turnTreeToComtree(children, comList);
      console.log(component);
    }
    res.push(component);
  }
  return res;
};

// 获取某站点路由列表
router.get('/:sid', function (req, res) {
  var sid = req.params.sid;

  Route.find({ sid: sid }).exec().then(function (data) {
    var routeTree = initRouteTree(data);
    dealRes(res, 200, routeTree);
  }).catch(function (e) {
    return dealError(res, e);
  });
});

// 新增条目
router.post('/', function (req, res) {
  // 获取数据
  var data = req.body;
  var type = data.type;

  Route.create(data).then(function (data) {
    if (type === 'single') {
      var resData = data.toObject();
      // 创建一个默认页面
      Route.findByIdAndUpdate(resData._id, (0, _extends3.default)({}, resData, {
        pages: [{
          route_id: data._id,
          path: data.path
        }]
      })).then(function (data2) {
        dealRes(res, 200, data2);
      }).catch(function (e) {
        return dealError(res, e);
      });
    } else {
      dealRes(res, 200, data);
    }
  }).catch(function (e) {
    return dealError(res, e);
  });
});

// 获取路由的模板树
router.get('/template/:_id', function (req, res) {
  var _id = req.params._id;

  Route.findById(_id).lean().exec().then(function (data) {
    var tree = data.template;
    var ids = filterComponentIds(tree);
    // 根据id数组获取数据集
    Component.find({ _id: { $in: ids } }
    // ['_id', 'name', 'type'],  // 只返回部分字段
    ).lean().exec().then(function (data2) {
      // 将组件数据集反推回树结构
      var result = turnTreeToComtree(tree, data2);
      dealRes(res, 200, result);
    }).catch(function (e) {
      return dealError(res, e);
    });
  }).catch(function (e) {
    return dealError(res, e);
  });
});

// 更新模板
router.post('/template/:_id', function (req, res) {
  var _id = req.params._id;

  var temp = req.body;
  Route.findById(_id).exec().then(function (data) {
    // 找到目标，更新模板内容
    var baseValue = data.toObject();
    Route.findByIdAndUpdate(_id, (0, _extends3.default)({}, baseValue, {
      template: temp
    })).exec().then(function (data2) {
      return dealRes(res, 200, data2);
    }).catch(function (e) {
      return dealError(res, e);
    });
  }).catch(function (e) {
    return dealError(res, e);
  });
});

module.exports = router;
//# sourceMappingURL=route.js.map
