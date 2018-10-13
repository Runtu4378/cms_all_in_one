'use strict';

/**
 * 返回体统一处理
 * @param {any} res res对象 
 * @param {number} code 返回码。不传值和传200时返回正确，其余为返回错误
 * @param {any} data 返回体内容
 */
var dealRes = function dealRes(res) {
  var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  var data = arguments[2];

  if (code !== 200) {
    return res.send({
      status: 'error',
      code: code,
      data: data
    });
  } else {
    return res.send({
      status: 'success',
      code: code,
      data: data
    });
  }
};

/**
 * 错误统一处理
 * @param {any} res res对象
 * @param {*} e 错误对象
 */
var dealError = function dealError(res, e) {
  console.error(e.message);
  return dealRes(res, 300, e.message);
};

exports.dealRes = dealRes;
exports.dealError = dealError;
//# sourceMappingURL=dealWrap.js.map
