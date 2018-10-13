const express = require('express')
const router = express.Router()
const { dealRes, dealError } = require('../utils/dealWrap')
const Route = require('../models/route')
const Component = require('../models/component')

/**
 * 将路由数组转换为路由数组树（非纯函数）
 * @param {Array} ary 被遍历数组
 * @param {*} pid 父路由id
 */
const initRouteTree = (ary, pid) => {
  const res = []
  for (let i = 0; i < ary.length; i += 1) {
    const target = ary[i].toObject() // 数据对象要 toObject() 才能修改
    const { _id, parent_id } = target
    if (parent_id === pid) {
      ary.splice(i, 1)
      i -= 1  // i 不回退一位的话会跳过一次遍历
      target.children = initRouteTree(ary, _id)
      res.push(target)
    }
  }
  return res
}

/**
 * 遍历数组，提取id数组
 * @param {Array} ary 进行提取的数据数组
 * @param {Array} baseVal 现有的id数组
 */
const filterComponentIds = (ary, baseVal = []) => {
  const baseIds = [...baseVal]
  let ids = []
  for (let i = 0; i < ary.length; i += 1) {
    const { com_id, children } = ary[i]
    if (baseIds.indexOf(com_id) === -1) {
      baseIds.push(com_id)
      ids.push(com_id)
    }
    if (children && children.length) {
      ids = ids.concat(filterComponentIds(children, ids))
    }
  }
  return ids
}

/**
 * 根据传入键值和要匹配的键值的值遍历对象数组，返回匹配到的第一个对象，如无匹配项返回false
 * @param {any} ary 要遍历的对象数组
 * @param {string} key 匹配的键值名
 * @param {any} keyValue 要匹配的键值的值
 */
const findTarget = (ary, key, keyValue) => {
  for (let i = 0; i < ary.length; i += 1) {
    if (ary[i][key].equals(keyValue)) {
      // 生成对象副本，而非引用
      return { ...ary[i] }
    }
  }
  return false
}

/**
 * 根据树结构数组提取组件数组，返回组件树
 * @param {any} tree 树数组
 * @param {any} comList 组件数组
 */
const turnTreeToComtree = (tree, comList) => {
  const res = []
  for (let i = 0; i < tree.length; i += 1) {
    const target = tree[i]
    console.log(target)
    const { com_id, children } = target
    let component = findTarget(comList, '_id', com_id)
    if (!component) {
      throw new Error('can\' t find patch component')
    }
    if (children && children.length) {
      console.log('had children')
      component.children = turnTreeToComtree(children, comList)
      console.log(component)
    }
    res.push(component)
  }
  return res
}

// 获取某站点路由列表
router.get('/:sid', (req, res) => {
  const { sid } = req.params
  Route.find({ sid }).exec()
    .then((data) => {
      const routeTree = initRouteTree(data)
      dealRes(res, 200, routeTree)
    })
    .catch(e => dealError(res, e))
})

// 新增条目
router.post('/', (req, res) => {
  // 获取数据
  const data = req.body
  const { type } = data
  Route.create(data)
    .then(data => {
      if (type === 'single') {
        const resData = data.toObject()
        // 创建一个默认页面
        Route.findByIdAndUpdate(resData._id, {
          ...resData,
          pages: [{
            route_id: data._id,
            path: data.path,
          }],
        })
          .then(data2 => {
            dealRes(res, 200, data2)
          })
          .catch(e => dealError(res, e))
      } else {
        dealRes(res, 200, data)
      }
    })
    .catch(e => dealError(res, e))
})

// 获取路由的模板树
router.get('/template/:_id', (req, res) => {
  const { _id } = req.params
  Route.findById(_id).lean().exec()
    .then(data => {
      const tree = data.template
      const ids = filterComponentIds(tree)
      // 根据id数组获取数据集
      Component.find(
        { _id: { $in: ids } },
        // ['_id', 'name', 'type'],  // 只返回部分字段
      ).lean().exec()
        .then(data2 => {
          // 将组件数据集反推回树结构
          const result = turnTreeToComtree(tree, data2)
          dealRes(res, 200, result)
        })
        .catch(e => dealError(res, e))
    })
    .catch(e => dealError(res, e))
})

// 更新模板
router.post('/template/:_id', (req, res) => {
  const { _id } = req.params
  const temp = req.body
  Route.findById(_id).exec()
    .then((data) => {
      // 找到目标，更新模板内容
      const baseValue = data.toObject()
      Route.findByIdAndUpdate(_id, {
        ...baseValue,
        template: temp,
      }).exec()
        .then(data2 => dealRes(res, 200, data2))
        .catch(e => dealError(res, e))
    })
    .catch(e => dealError(res, e))
})

module.exports = router
