import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name:'auth',
  initialState:{
    currentUser: null,
    isFetching: false,
    error:false,
  },
  reducers:{
    //!LOGIN
    loginStart:(state)=>{
      state.isFetching=true;  // ! fetch islemini baslatiyor
    },
    loginSuccess:(state,action)=>{
      state.isFetching=false; // ! fetch islemi basarili olunca bitiriyoruz
      state.currentUser=action.payload;
    },
    loginFailure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },

    //!LOGOUT
    logout:(state)=>{
      state.currentUser=false
      state.error=false
    },

    //!REGISTER
    registerStart:(state)=>{
      state.isFetching=true;  // ! fetch islemini baslatiyor
    },
    registerSuccess:(state,action)=>{
      state.isFetching=false; // ! fetch islemi basarili olunca bitiriyoruz
      state.currentUser=action.payload;
    },
    registerFailure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },
  },
})

export const {loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailrue,} = authSlice.actions;
export default authSlice.reducer;