import { message } from 'antd';
import { addQuestion, queryQuestion } from '../services/api';

export default {
  namespace: 'question',

  state: {
    questions:[],
  },

  effects: {
    *add({ payload }, { call }) {
      console.log(payload);
      yield call(addQuestion, payload);
      message.success('提交成功');
    },
    *queryQuestion({ payload }, { call, put }) {
      console.log(payload);
      const resp = yield call(queryQuestion, payload);
      yield put({
        type: 'show',
        payload: resp,
      })
    }
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
      }
    }
  },
};
