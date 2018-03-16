import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { addTech, initTree } from '../services/api';

export default {
  namespace: 'tech',

  state: {
    treeData: [],
  },

  effects: {
    *add({ payload }, { call, put }) {
      console.log(payload);
      const resp = yield call(addTech, payload);
      console.log(resp);
      yield put({
        type: 'show',
        payload: resp,
      });
    },
    *init(_, { call, put }) {
      const payload = yield call(initTree);
      yield put({
        type: 'init2',
        payload,
      });
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    init2(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
