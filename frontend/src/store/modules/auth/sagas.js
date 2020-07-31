import { call, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { notification } from 'antd';
import history from '../../../services/history';

import { signInSuccess, signFailure, signUpFailure, signUpSuccess } from './actions';

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, '/sessions', {
      email,
      password
    });

    const { token } = response.data;
    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    yield put(signInSuccess({ token }));

    history.push('/');

  } catch (err) {
    if (err.response.data.error === 'Invalid email or password') {
      openNotificationWithIcon('error', 'Ops!', 'Usuário e/ou senha inválidos');
    }
    yield put(signFailure());
  }
}

function* signUp({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, '/users', {
      email,
      password
    });

    const { token } = response.data;

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    yield put(signUpSuccess({ token }));

    history.push('/');
  } catch (err) {
    if (err.response.data.error === 'User already exists') {
      openNotificationWithIcon('error', 'Ops!', 'Esse usuário já existe');
    }
    yield put(signUpFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
])