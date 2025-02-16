import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: { orders: [], totalPrice: 0 },
  reducers: {
    placeOrder: (state, action) => {
      const newOrder = {
        id: Date.now(), // Unique order ID
        items: action.payload,
        totalPrice: action.payload.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        date: new Date().toISOString(),
      };
      state.orders.push(newOrder);
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
    },
    clearOrder: (state) => {
      state.orders = [];
    },
  },
});

export const { placeOrder, clearOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;
