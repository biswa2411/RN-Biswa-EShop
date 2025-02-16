import { all } from 'redux-saga/effects';
import { watchAuth } from './authSaga';
import { watchProducts } from './productSaga';

export default function* rootSaga() {
  yield all([watchAuth(), watchProducts()]);
}
