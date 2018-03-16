import { fakeRegister } from '../services/api';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      // 这个payload是dispatch里面的action传过来的
      console.log(payload);
      const response = yield call(fakeRegister, payload);
      console.log(response);
      console.log(response.status);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        mail: payload.mail,
      };
    },
  },
};
