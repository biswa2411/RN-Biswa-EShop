import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { loginRequest, loginSuccess, loginFailure } from '../slices/authSlice';

function* loginUser(action) {
  try {
    const response = yield call(axios.post, 'https://dummyjson.com/auth/login', action.payload);
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export function* watchAuth() {
  yield takeLatest(loginRequest.type, loginUser);
}
