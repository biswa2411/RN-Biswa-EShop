import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: { list: [], loading: false, error: null },
  reducers: {
    fetchProductsRequest: (state) => { state.loading = true; },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure } = productSlice.actions;
export default productSlice.reducer;
