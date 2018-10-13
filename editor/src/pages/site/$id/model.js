import moduleExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { model } from 'utils/model'
// import { message } from 'antd'
import Template from 'services/template'
import {
  details,
  routeList,
  getTemplate,
  setTemplate,
  componentList,
} from './service'

const initState = {
  id: null, // 编辑对象的id
  siteDetail: {}, // 站点详情
  routeList: [], // 路由列表

  routeEditState: false,  // 是否在编辑路由
  routeEditItem: null,  // 正在编辑的路由对象

  templateList: [], // 页面模板数据

  componentSelectState: false,  // 是否打开选择组件视图
  componentSelectData: {
    list: [], // 组件列表
    selectState: false, // 是否选中
    selectItem: {}, // 选中目标
  },  // 选择组件视图数据
  htmlStr: '', // 渲染内容
}

export default moduleExtend(model, {
  namespace: 'siteEdit',
  state: {
    ...initState,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/site/:id').exec(pathname)
        if (match) {
          const componentId = match[1]
          dispatch({ type: 'init', payload: componentId })
        }
      })
    },
  },
  effects: {
    // 初始化信息
    * init ({ payload }, { put, call }) {
      yield put({ type: 'updateState', payload: { id: payload } })
      const { success, data } = yield call(details, payload)
      if (success) {
        yield put.resolve({ type: 'updateState', payload: { siteDetail: data } })
        yield put({ type: 'getRouteList' })
      } else {
        throw new Error(data)
      }
    },
    // 获取路由列表
    * getRouteList (inVal, { select, call, put }) {
      const { siteDetail } = yield select(({ siteEdit }) => siteEdit)
      const { success, data } = yield call(routeList, siteDetail._id)
      if (success) {
        yield put({ type: 'updateState', payload: { routeList: data } })
      } else {
        throw new Error(data)
      }
    },

    // 进入路由编辑状态
    * intoEditRoute ({ payload }, { put }) {
      yield put.resolve({
        type: 'updateState',
        payload: { routeEditState: true, routeEditItem: payload },
      })
      yield put.resolve({ type: 'queryTemplate' })
      yield put({ type: 'renderTemplate' })
    },
  
    // 进入选择组件状态
    * switchComponentSelect ({ show }, { put }) {
      yield put({
        type: 'updateState',
        payload: { componentSelectState: show, componentSelectData: initState.componentSelectData },
      })
    },
    // 获取选择组件视图数据
    * getComponentSelectData (inval, { select, call, put }) {
      const { componentSelectData } = yield select(({ siteEdit }) => siteEdit)
      const { success, data } = yield call(componentList)
      if (success) {
        yield put({
          type: 'updateState',
          payload: { componentSelectData: { ...componentSelectData, list: data } },
        })
      } else {
        throw new Error(data)
      }
    },
    // 选取组件以预览数据
    * componentSelect ({ payload }, { select, put }) {
        const { componentSelectData } = yield select(({ siteEdit }) => siteEdit)
        yield put({
          type: 'updateState',
          payload: {
            componentSelectData: {
              ...componentSelectData,
              selectState: true,
              selectItem: payload,
            },
          },
        })
    },
    // 获取模板内容
    * queryTemplate (inval, { select, call, put }) {
        const { routeEditItem } = yield select(({ siteEdit }) => siteEdit)
        const { success, data } = yield call(getTemplate, routeEditItem._id)
        if (success) {
          yield put({
            type: 'updateState',
            payload: { templateList: data },
          })
        } else {
          throw new Error(data)
        }
    },
    // 更新模板内容
    * setTemplate ({ payload }, { select, call, put }) {
      const { routeEditItem } = yield select(({ siteEdit }) => siteEdit)
      const { success, data } = yield call(setTemplate, routeEditItem._id, payload)
      if (success) {
        yield put({ type: 'queryTemplate' })
      } else {
        throw new Error(data)
      }
    },
    // 渲染模板
    * renderTemplate (inval, { select, call, put }) {
      const { templateList } = yield select(({ siteEdit }) => siteEdit)
      const template = new Template(templateList)
      const res = yield call(template.renderStr)
      yield put({
        type: 'updateState',
        payload: { htmlStr: res },
      })
    },
  },
})
