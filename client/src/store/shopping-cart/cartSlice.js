import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,

  reducers: {
    addItem(state, action) {
      // Take data from action
      const newItem = action.payload;
      //Filtered new data in the initial state
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );
      // Total quantity will increase by 1
      state.totalQuantity++;
      // If there is no new item in existing item, push the data of the new one to the array
      if (!existingItem) {
        state.cartItems.push({
          _id: newItem._id,
          foodName: newItem.foodName,
          image: newItem.image,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      // If there is new item, this will increase the quantity of its as well as the total price
      // Total price is calculated as the total price of the new item and the price of current item
      else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    removeItem(state, action) {
      const _id = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === _id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item._id !== _id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    deleteItem(state, action) {
      const _id = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === _id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item._id !== _id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    clearAllItems(state, action) {
      // Sepet öğelerini sıfırlamak için payload'dan yeni bir dizi alın
      state.cartItems = action.payload;
      // Sepetteki toplam ürün sayısı ve toplam miktarı güncelleyin (gerekiyorsa)
      state.totalQuantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
