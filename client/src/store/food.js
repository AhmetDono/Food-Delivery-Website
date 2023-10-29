import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name:'food',
  initialState:{
    foods: [],
    isFetching: false,
    error:false,
  },
  reducers:{
    //! GET ALL FOOD
    getFoodsStart:(state)=>{
      state.isFetching=true;  // ! fetch islemini baslatiyor
      state.error=false;
    },
    getFoodsSuccess:(state,action)=>{
      state.isFetching=false; // ! fetch islemi basarili olunca bitiriyoruz
      state.error=false;
      state.foods=action.payload;
    },
    getFoodsFailure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },
  },
})

export const {getFoodsStart,
    getFoodsSuccess,
    getFoodsFailure,
  } = foodSlice.actions;
export default foodSlice.reducer;