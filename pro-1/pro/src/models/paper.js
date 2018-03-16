import { message } from 'antd';
import { addPaper, findPaper } from '../services/api';

export default {
  namespace: 'paper',

  state: {
    status: "",                           
    paperList: [],
  },

  effects: {
    *add({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(addPaper, payload);
      console.log(response);
      yield put({
        type: 'show',
        payload: response,
      });
      message.success('提交成功');
    },
    *init(_, { call, put }) {
      const resp = yield call(findPaper);
      console.log(resp);
      yield put({
        type: 'show',
        payload: resp,
      })
    }
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
