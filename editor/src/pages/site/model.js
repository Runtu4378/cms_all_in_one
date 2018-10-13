import moduleExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import { model } from 'utils/model'
import { message } from 'antd'
import {
  list,
  create,
  createRoute,
  routeList,
} from './service'

export default moduleExtend(model, {
  namespace: 'site',
  state: {
    list: [], // 站点列表
    selectItem: null, // 编辑对象
    createVisible: false, // 创建弹窗可视状态
    routeCreateVisible: false,  // 创建路由弹窗可视状态
    routeEditVisible: false,  // 编辑路由弹窗可视状态
    routeEditItem: {}, // 编辑路由对象
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/site') {
          dispatch({ type: 'query' })
        }
      })
    },
  },
  effects: {
    // 跳转到编辑界面
    * linkToEdit (inval, { select, put }) {
      const { selectItem } = yield select(({ site }) => site)
      if (!selectItem) {
        throw new Error('缺少站点信息')
      }
      yield put(routerRedux.push(`/site/${selectItem._id}`))
    },
    // 获取站点列表
    * query (val, { call, put }) {
      const { success, data } = yield call(list)
      if (success) {
        yield put({
          type: 'updateState',
          payload: { list: data },
        })
      } else {
        throw new Error(data)
      }
    },
    // 显示创建站点弹窗
    * showCreate ({ show }, { put }) {
      yield put({ type: 'updateState', payload: { createVisible: show } })
    },
    // 创建站点
    * create ({ payload }, { call, put }) {
      const { success, data } = yield call(create, payload)
      if (success) {
        message.success('创建成功')
        yield put({ type: 'showCreate', show: false })
        yield put({ type: 'query' })
      } else {
        throw new Error(data)
      }
    },
    // 选择站点
    * select ({ payload }, { put }) {
      yield put.resolve({
        type: 'updateState',
        payload: {
          selectItem: { ...payload, routes: [] },
        },
      })
      yield put({ type: 'querySiteRoute' })
    },
    // 显示创建路由弹窗
    * showCreateRoute ({ show }, { put }) {
      yield put({ type: 'updateState', payload: { routeCreateVisible: show } })
    },
    * querySiteRoute (inval, { select, call, put }) {
      const { selectItem } = yield select(({ site }) => site)
      if (!selectItem) {
        throw new Error('缺少站点信息')
      }
      const { success, data } = yield call(routeList, selectItem._id)
      if (success) {
        yield put({
          type: 'updateState',
          payload: { selectItem: { ...selectItem, routes: data } },
        })
      } else {
        throw new Error(data)
      }
    },
    // 创建站点
    * createRoute ({ payload }, { select, call, put }) {
      const { selectItem } = yield select(({ site }) => site)
      if (!selectItem) {
        throw new Error('缺少站点信息')
      }
      const { success, data } = yield call(createRoute, {
        sid: selectItem._id,
        ...payload,
      })
      if (success) {
        message.success('创建成功')
        yield put({ type: 'showCreateRoute', show: false })
        yield put({ type: 'querySiteRoute' })
      } else {
        throw new Error(data)
      }
    },
    // 显示编辑路由抽屉
    * showEditRoute ({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload: { routeEditVisible: true, routeEditItem: payload },
      })
    },
    // 隐藏编辑路由抽屉
    * hideEditRoute (inval, { put }) {
      yield put({
        type: 'updateState',
        payload: { routeEditVisible: false, routeEditItem: {} },
      })
    },
  },
})
