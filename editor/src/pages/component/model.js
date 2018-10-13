import moduleExtend from 'dva-model-extend'
import { message } from 'antd'
import { model } from 'utils/model'
import { list, create } from './service'

export default moduleExtend(model, {
  namespace: 'component',
  state: {
    list: [], // 组件列表
    viewItem: null, // 预览对象
    createVisible: false, // 创建弹窗显示状态
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/component') {
          dispatch({ type: 'query' })
        }
      })
    },
  },
  effects: {
    // 获取组件列表
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
    // 预览组件
    * view ({
     payload,
    }, { put }) {
      const target = payload
      yield put({
        type: 'updateState',
        payload: { viewItem: target },
      })
    },
    * updateViewProps ({
      payload,
    }, { put, select }) {
      const baseItem = yield select(({ component }) => component.viewItem)
      baseItem.props = { ...baseItem.props, ...payload }
      yield put({
        type: 'updateState',
        payload: {
          viewItem: baseItem,
        },
      })
    },
    // 显示创建组件弹窗
    * showCreate ({ show }, { put }) {
      yield put({ type: 'updateState', payload: { createVisible: show } })
    },
    // 创建组件
    * createComponent ({ payload }, { call, put }) {
      const { success, data } = yield call(create, payload.name, payload.type)
      if (success) {
        message.success('创建成功')
        yield put({ type: 'showCreate', show: false })
        yield put({ type: 'query' })
      } else {
        throw new Error(data)
      }
    },
  },
})
