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

    //! ADD FOOD
    createFoodStart:(state)=>{
      state.isFetching=true;  // ! fetch islemini baslatiyor
      state.error=false;
    },
    createFoodSuccess:(state,action)=>{
      state.isFetching=false; // ! fetch islemi basarili olunca bitiriyoruz
      state.error=false;
      state.foods.push(action.payload);
    },
    createFoodFailure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },

    //!UPDATE FOOD
    updateFoodStart:(state)=>{
      state.isFetching=true;
      state.error=false;
    },
    updateFoodSuccess:(state,action)=>{
      state.isFetching=false;
      state.error=false;
      state.foods[state.foods.findIndex((item)=>item._id===action.payload.id)] = action.payload.food
    },
    updateFoodFailure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },

    //! DELETE FOOD
    deleteFoodtStart:(state)=>{
      state.isFetching=true;
      state.error=false;
    },
    deleteFoodSuccess:(state,action)=>{
      state.isFetching=false;
      state.error=false;
      state.foods.splice(
        state.foods.findIndex(item=>item._id===action.payload),1
        );
    },
    deleteFoodFailure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },
  },
})

export const {getFoodsStart,
    getFoodsSuccess,
    getFoodsFailure,
    createFoodStart,
    createFoodSuccess,
    createFoodFailure,
    updateFoodStart,
    updateFoodSuccess,
    updateFoodFailure,
    deleteFoodtStart,
    deleteFoodSuccess,
    deleteFoodFailure,
  } = foodSlice.actions;
export default foodSlice.reducer;