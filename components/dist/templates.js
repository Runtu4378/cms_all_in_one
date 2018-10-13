module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/templates/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/templates/index.js":
/*!********************************!*\
  !*** ./src/templates/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _page = __webpack_require__(/*! ./page1 */ "./src/templates/page1/index.js");

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = [_page2.default];

/***/ }),

/***/ "./src/templates/page1/index.js":
/*!**************************************!*\
  !*** ./src/templates/page1/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _template = __webpack_require__(/*! ../../utils/template */ "./src/utils/template.js");

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tempFunc = new _template2.default('page1');

exports.default = tempFunc;

/***/ }),

/***/ "./src/utils/template.js":
/*!*******************************!*\
  !*** ./src/utils/template.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Temp = function () {
  // 组件树配置

  /**
   * 模板类
   * @param {string} templateName 模板名
   */
  // 变量值

  // 模板名

  function Temp(templateName) {
    _classCallCheck(this, Temp);

    this.templateName = null;
    this.prototype = null;
    this.props = null;
    this.comList = null;
    this.comConfig = null;

    this.templateName = templateName;
  }

  /**
   * 设置模板结构
   */
  // 组件模板函数列表
  // 变量格式

  Temp.prototype.set = function set() {};

  /**
   * 根据组件名和组件列表获取组件实例
   * @param {array} comList 组件实例列表
   * @param {string} componentNname 组件名
   */


  Temp.prototype.mapCom = function mapCom(comList, componentNname) {
    if (!comList || !(comList instanceof Array)) {
      throw new Error('tyeof comList error, should be object');
    } else if (!componentNname) {
      throw new Error('componentNname is required');
    }
    this.comList = comList;
  };

  /**
   * 遍历组件树，返回组件树渲染结果
   * @param {array} list 组件实例列表
   * @param {*} config 组件树配置
   * @returns {string} 渲染结果
   */


  Temp.prototype.mapTree = function (_mapTree) {
    function mapTree(_x, _x2) {
      return _mapTree.apply(this, arguments);
    }

    mapTree.toString = function () {
      return _mapTree.toString();
    };

    return mapTree;
  }(function (list, config) {
    var componentName = config.componentName,
        props = config.props,
        children = config.children;

    var baseFunc = this.mapCom(list, componentName);
    var childrenAry = [];
    if (children) {
      childrenAry = mapTree(list, config);
    }
    return baseFunc(_extends({}, props, { children: childrenAry }));
  });

  // 渲染函数


  Temp.prototype.render = function render(props) {
    var DOM = this.mapTree(this.comList, this.comConfig);
    // 遍历组件树
    return { vars: props, DOM: DOM };
  };

  return Temp;
}();

exports.default = Temp;

/***/ })

/******/ });
//# sourceMappingURL=templates.js.map