import { combineReducers } from 'redux';
import authReducer from './authSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import productDetailsReducer from './productDetailsSlice';
import orderReducer from './orderSlice';

export default combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  productDetails: productDetailsReducer,
  order:orderReducer,
});
