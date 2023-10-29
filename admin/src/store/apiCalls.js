import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./auth"
import {publicRequest} from '../requestMethods'
import { getUsersFailure, getUsersStart, getUsersSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./user";
import { createFoodFailure, createFoodStart, createFoodSuccess, deleteFoodFailure, deleteFoodSuccess, deleteFoodtStart, getFoodsFailure, getFoodsStart, getFoodsSuccess, updateFoodFailure, updateFoodStart, updateFoodSuccess } from "./food";

//!auth
export const login = async(dispatch,user)=>{
    dispatch(loginStart());
    try{
        const res = await publicRequest.post('auth/login',user)
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailure(err))
    }
}

export const register = async(dispatch,user)=>{
    dispatch(registerStart());
    try{
        const res = await publicRequest.post('auth/register',user)
        dispatch(registerSuccess(res.data))
    }catch(error){
        dispatch(registerFailure(error))
    }
}

//!user
export const getAllUsers = async(dispatch)=>{
    dispatch(getUsersStart());
    try {
        const res = await publicRequest.get("user/getAllUser");
        dispatch(getUsersSuccess(res.data))
    } catch (error) {
        dispatch(getUsersFailure(error))
    }
}

export const updateUser = async(dispatch,user,id)=>{
    dispatch(updateUserStart());
    try {
    const res = await publicRequest.put(`user/updateUser/${id}`,user);
    dispatch(updateUserSuccess(res.data));
    } catch (err) {
    dispatch(updateUserFailure());
    }
}

//!food
export const getAllFoods = async(dispatch)=>{
    dispatch(getFoodsStart());
    try {
        const res = await publicRequest.get("food/getAllFood");
        dispatch(getFoodsSuccess(res.data))
    } catch (error) {
        dispatch(getFoodsFailure(error))
    }
}

export const createFood = async (dispatch,food) => {
    dispatch(createFoodStart());
    try {
      const res = await publicRequest.post(`food/createFood`,food);
      dispatch(createFoodSuccess(res.data));
    } catch (err) {
      dispatch(createFoodFailure(err));
    }
};

export const updateFood = async(dispatch,food,id)=>{
    dispatch(updateFoodStart());
    try {
    const res = await publicRequest.put(`food/updateFood/${id}`,food);
    dispatch(updateFoodSuccess(res.data));
    } catch (err) {
    dispatch(updateFoodFailure(err));
    }
}

export const deleteFood = async (dispatch,id) => {
    dispatch(deleteFoodtStart());
    try {
        await publicRequest.delete(`food/deleteFood/${id}`);
        dispatch(deleteFoodSuccess(id));
    } catch (err) {
      dispatch(deleteFoodFailure());
    }
};
  



//export const logout = async(dispatch)=>{
    //dispatch(logoutStart());
    //try{
        //const res = await publicRequest.post('auth/logout')
        //dispatch(logoutSuccess(res.data))
    //}catch(err){
        //dispatch(logoutFailrue(err))
    //}
//}