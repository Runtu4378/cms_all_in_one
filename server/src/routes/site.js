const express = require('express')
const router = express.Router()
const { dealRes, dealError } = require('../utils/dealWrap')
const Site = require('../models/site')

// 获取列表
router.get('/', (req, res) => {
  Site.find().exec()
    .then(data => dealRes(res, 200, data))
    .catch(e => dealError(res, e))
})

// 获取详情
router.get('/:_id', (req, res) => {
  const { _id } = req.params
  Site.findById(_id).exec()
    .then(data => dealRes(res, 200, data))
    .catch(e => dealError(res, e))
})

// 新增条目
router.post('/', (req, res) => {
  const { name } = req.body
  Site.create({
    name,
  })
    .then(data => dealRes(res, 200, data))
    .catch(e => dealError(res, e))
})

module.exports = router
