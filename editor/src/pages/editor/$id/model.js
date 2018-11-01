import moduleExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { routerRedux } from 'dva/router'
import { message } from 'antd'
import { model } from 'utils/model'
import Component from 'services/vue_builder/component'
import { details, update } from './service'

const componentInit = {
  _id: null,
  name: '',
  type: null,
  code_type: null,

  html_code: '',
  html_transformer: 'artm',
  html_proptypes: [],
  html_props: {},

  css_code: '',
  css_transformer: 'less',
  css_proptypes: [],
  css_props: {},

  js_code: '',
  js_transformer: 'js',
  js_proptypes: [],
  js_props: {},
}

export default moduleExtend(model, {
  namespace: 'editor',
  state: {
    editItem: componentInit,
    autoRun: true,
    htmlStr: '',
    createKeyVisible: false,  // 新增键值弹窗的可视状态
    createKeyType: null,  // 新增键值的类型
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/editor/:id').exec(pathname)
        if (match) {
          const componentId = match[1]
          dispatch({ type: 'enter', payload: componentId })
        }
      })
    },
  },
  effects: {
    * enter ({ payload: id }, { call, put }) {
      const { success, data } = yield call(details, id)
      if (success) {
        // 串行执行
        yield put.resolve({ type: 'INIT_CODE', payload: data })
        yield put.resolve({ type: 'initProp' })
        // 等待至上述两个操作都执行完成再渲染模板
        // yield take('editor/')
        yield put({ type: 'buildComponent' })
      } else {
        throw new Error(data)
      }
    },
    * back (inval, { put }) {
      yield put(routerRedux.push('/'))
    },
    // 保存模板内容
    * save (inval, { select, call }) {
      const { editItem } = yield select(({ editor }) => editor)
      const content = {
        ...editItem,
      }
      const { success, data } = yield call(update, editItem._id, content)
      if (success) {
        message.success('保存成功')
      } else {
        throw new Error(data)
      }
    },
    // 更新代码内容
    * updateCode ({ payload }, { select, put }) {
    const { autoRun } = yield select(({ editor }) => editor)
      yield put({ type: 'UPDATE_CODE', payload })
      if (autoRun) {
        yield put({ type: 'buildComponent' })
      }
    },
    // 变换自动运行值
    * changeAutoRun (inval, { select, put }) {
      const nowVal = yield select(({ editor }) => editor.autoRun)
      yield put({ type: 'updateState', payload: { autoRun: !nowVal } })
    },
    // 编译组件，生成iframe字符串
    * buildComponent (inval, { select, put }) {
      const { editItem } = yield select(({ editor }) => editor)
      const component = new Component({
        name: editItem.name,
        
        template: editItem.html_code,
        style: editItem.css_code,
        style_props: editItem.css_props,
        script: editItem.js_code,
        script_props: editItem.js_props,
      })
      const htmlStr = yield component.render()
      yield put({ type: 'updateState', payload: { htmlStr } })
    },
    // 显示新增键值弹窗
    * showCreateKey ({ createKeyType }, { put }) {
      if (!(createKeyType === 'html' || createKeyType === 'css' || createKeyType === 'js')) {
        throw new Error(`type for create key is error: ${createKeyType}`)
      }
      yield put({
        type: 'updateState',
        payload: { createKeyVisible: true, createKeyType },
      })
    },
    * hideCreateKey (inval, { put }) {
      yield put({
        type: 'updateState',
        payload: { createKeyVisible: false, createKeyType: null },
      })
    },
    // 根据默认值初始化参数值
    * initProp (inval, { put }) {
      yield put({ type: 'initPropsDefault', keyType: 'html' })
      yield put({ type: 'initPropsDefault', keyType: 'css' })
      yield put({ type: 'initPropsDefault', keyType: 'js' })
    },
    * initPropsDefault ({ keyType }, { select, put }) {
      const editItem = yield select(({ editor }) => editor.editItem)
      const originalVal = editItem[`${keyType}_proptypes`]
      const values = {}
      for (let i = 0; i < originalVal.length; i += 1) {
        const tar = originalVal[i]
        values[tar.name] = tar.defaultValue
      }
       yield put({ type: 'updateProps', propsType: keyType, values })
    },
    // 插入组件模板参数键值
    * insertNewkey ({ keyType, values }, { select, put }) {
      const editItem = yield select(({ editor }) => editor.editItem)
      const originalVal = editItem[`${keyType}_proptypes`]
      // 检测是否键值重复
      const findIdx = originalVal.findIndex(v => v.name === values.name)
      if (findIdx !== -1) {
        throw new Error(`已有该键值：${values.name}`)
      }
      const newItem = { ...editItem }
      newItem[`${keyType}_proptypes`] = originalVal.concat([values])
      yield put({
        type: 'updateState',
        payload: { editItem: newItem },
      })
      const valueSet = {}
      valueSet[values.name] = values.defaultValue
      // 初始化键值参数
      yield put({
        type: 'updateProps',
        propsType: keyType,
        values: valueSet,
      })
      // 隐藏弹窗
      yield put({ type: 'hideCreateKey' })
    },
    // 更新对应键值参数
    * updateProps ({ propsType, values }, { select, put }) {
        const editItem = yield select(({ editor }) => editor.editItem)
        const originalVal = editItem[`${propsType}_props`]
        const newItem = { ...editItem }
        newItem[`${propsType}_props`] = { ...originalVal, ...values }
        yield put({
          type: 'updateState',
          payload: { editItem: newItem },
        })
    },
  },
  reducers: {
    UPDATE_CODE (state, { payload }) {
      const { type, code } = payload
      if (!(
        type === 'html' ||
        type === 'css' ||
        type === 'js'
      )) {
        throw new Error(`incorrect type of code: ${type}`)
      }
      const newState = { ...state }
      newState.editItem[`${type}_code`] = code
      return newState
    },
    INIT_CODE (state, { payload }) {
      return {
        ...state,
        editItem: {
          ...state.editItem,
          ...payload,
        },
      }
    },
  },
})
