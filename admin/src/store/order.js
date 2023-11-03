import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name:'order',
  initialState:{
    orders:[],
    isFetching: false,
    error:false,
  },
  reducers:{ //! Iki Kod ayni kotu bi yazim
    //! ALL ORDER
    getAllOrderStart:(state)=>{
      state.isFetching=true;  // ! fetch islemini baslatiyor
      state.error=false;
    },
    getAllOrderSuccess:(state,action)=>{
      state.isFetching=false; // ! fetch islemi basarili olunca bitiriyoruz
      state.error=false;
      state.orders=action.payload;
    },
    getAllOrderFailure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },
    //! USERS ORDER
    getUserOrderStart:(state)=>{
      state.isFetching=true;  // ! fetch islemini baslatiyor
      state.error=false;
    },
    getUserOrderSuccess:(state,action)=>{
      state.isFetching=false; // ! fetch islemi basarili olunca bitiriyoruz
      state.error=false;
      state.orders=action.payload;
    },
    getUserOrderFailure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },
  },
})

export const {getAllOrderStart,
    getAllOrderSuccess,
    getAllOrderFailure,
    getUserOrderStart,
    getUserOrderSuccess,
    getUserOrderFailure
  } = orderSlice.actions;
export default orderSlice.reducer;