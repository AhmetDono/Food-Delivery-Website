import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name:'order',
  initialState:{
    userId:null,
    foods: [],
    address:null,
    total:0,
    isFetching: false,
    error:false,
  },
  reducers:{
    //! CREATE ORDER
    createOrderStart:(state)=>{
      state.isFetching=true;  // ! fetch islemini baslatiyor
      state.error=false;
    },
    createOrderSuccess:(state,action)=>{
      state.isFetching=false; // ! fetch islemi basarili olunca bitiriyoruz
      state.error=false;
      state.orders.push(action.payload);
    },
    createOrderFailure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },
  },
})

export const {createOrderStart,
    createOrderSuccess,
    createOrderFailure,
  } = orderSlice.actions;
export default orderSlice.reducer;