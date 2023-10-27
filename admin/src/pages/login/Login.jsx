import "./login.scss"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../store/apiCalls";

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const dispatch = useDispatch();
  const {isFetching,error} = useSelector((state)=>state.auth)
  const handleClick=(e)=>{
    e.preventDefault();
    login(dispatch,{email,password})
  }
  return (
    <>
    <form className='form mb-5'>
    <div className='form__group'>
      <input onChange={(e)=>setEmail(e.target.value)}
        type='email'
        placeholder='Email'
      />
    </div>
    <div className='form__group'>
      <input onChange={(e)=>setPassword(e.target.value)}
        type='text'
        placeholder='Password'
      />
    </div>
    <div>{error && "Something Went Wrong"}</div>
    <button onClick={handleClick} disabled={isFetching} type='submit' className='addToCart__btn'>
      Login
    </button>
  </form>
  </>
  )
}

export default Login