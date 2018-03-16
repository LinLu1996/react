import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function addTech(params) {
  return request('/api2/tech/add', {
    method: 'POST',
    body: params,
  });
}
export async function initTree() {
  return request('/api2/tech/init');
}
export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}
export async function addQuestion(params) {
  return request('/api2/question/add', {
    method: 'POST',
    body: params,
  });
}
export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api2/users/login', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api2/users/register', {
    method: 'POST',
    body: params,
  });
}
export async function addPaper(params) {
  return request('/api2/paper/add', {
    method: 'POST',
    body: params,
  });
}
export async function queryNotices() {
  return request('/api/notices');
}
export async function queryQuestion(params) {
  return request(`/api2/question/queryQuestion?${stringify(params)}`);
}
export async function findPaper() {
  return request('/api2/paper/init');
}