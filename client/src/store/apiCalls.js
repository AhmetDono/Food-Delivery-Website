import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./auth"
import {publicRequest} from '../requestMethods'
import { getFoodsFailure, getFoodsStart, getFoodsSuccess } from "./food";


//! Auth
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
    }catch(err){
        dispatch(registerFailure(err))
    }
}

//!Food
export const getAllFoods = async(dispatch)=>{
    dispatch(getFoodsStart());
    try {
        const res = await publicRequest.get("food/getAllFood");
        dispatch(getFoodsSuccess(res.data))
    } catch (error) {
        dispatch(getFoodsFailure(error))
    }
}



//export const logout = async(dispatch)=>{
    //dispatch(logoutStart());
    //try{
        //const res = await publicRequest.post('auth/logout')
        //dispatch(logoutSuccess(res.data))
    //}catch(err){
        //dispatch(logoutFailrue(err))
    //}
//}