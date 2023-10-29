import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:'user',
  initialState:{
    users: [],
    isFetching: false,
    error:false,
  },
  reducers:{
    //! tum kullanici listesini cekmek
    getUsersStart:(state)=>{
      state.isFetching=true;  // ! fetch islemini baslatiyor
      state.error=false;
    },
    getUsersSuccess:(state,action)=>{
      state.isFetching=false; // ! fetch islemi basarili olunca bitiriyoruz
      state.error=false;
      state.users=action.payload;
    },
    getUsersFailure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },

    //!Update User
    updateUserStart:(state)=>{
      state.isFetching=true;
      state.error=false;
    },
    updateUserSuccess:(state,action)=>{
      state.isFetching=false;
      state.error=false;
      state.users[state.users.findIndex((item)=>item._id===action.payload.id)] = action.payload.user
    },
    updateUserFailure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },
  },
})

export const {getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
  } = userSlice.actions;
export default userSlice.reducer;