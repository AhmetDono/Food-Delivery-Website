import { createSlice } from '@reduxjs/toolkit';

const cartUiSlice = createSlice({
  name: 'cartUI',
  initialState: { cartIsVisable: false },

  reducers: {
    toggle(state) {
      state.cartIsVisable = !state.cartIsVisable;
    },
  },
});

export const cartUiActions = cartUiSlice.actions;
export default cartUiSlice;
