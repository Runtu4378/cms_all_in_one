import moduleExtend from 'dva-model-extend'
import { model } from 'utils/model'

export default moduleExtend(model, {
  namespace: 'template',
  state: {
    list: [], // 模板列表
    editItem: null, // 编辑对象
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/template') {
          dispatch({ type: 'query' })
        }
      })
    },
  },
  effects: {
    * query (val, { put }) {
      // const data = require('../../../../components/dist/components')
      // const data = []
      const data = []
      yield put({
        type: 'updateState',
        payload: { list: data },
      })
    },
  },
})
