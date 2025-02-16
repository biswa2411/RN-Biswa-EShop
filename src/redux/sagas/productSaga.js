import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure } from '../slices/productSlice';

function* fetchProducts() {
  try {
    const response = yield call(axios.get, 'https://dummyjson.com/products');
    yield put(fetchProductsSuccess(response.data.products));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

export function* watchProducts() {
  yield takeLatest(fetchProductsRequest.type, fetchProducts);
}
