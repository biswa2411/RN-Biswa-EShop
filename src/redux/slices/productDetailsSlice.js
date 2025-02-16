import { createSlice } from '@reduxjs/toolkit';

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: { selectedProduct: null },
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { selectProduct } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
