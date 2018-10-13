/**
 * 返回体统一处理
 * @param {any} res res对象 
 * @param {number} code 返回码。不传值和传200时返回正确，其余为返回错误
 * @param {any} data 返回体内容
 */
const dealRes = (res, code = 200, data) => {
  if(code !== 200) {
    return res.send({
      status: 'error',
      code,
      data: data,
    })
  }else{
    return res.send({
      status: 'success',
      code,
      data: data,
    })
  }
}

/**
 * 错误统一处理
 * @param {any} res res对象
 * @param {*} e 错误对象
 */
const dealError = (res, e) => {
  console.error(e.message)
  return dealRes(res, 300, e.message)
}

exports.dealRes = dealRes
exports.dealError = dealError
