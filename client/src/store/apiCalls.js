import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./auth"
import {publicRequest} from '../requestMethods'


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


//export const logout = async(dispatch)=>{
    //dispatch(logoutStart());
    //try{
        //const res = await publicRequest.post('auth/logout')
        //dispatch(logoutSuccess(res.data))
    //}catch(err){
        //dispatch(logoutFailrue(err))
    //}
//}