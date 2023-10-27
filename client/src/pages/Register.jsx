import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/apiCalls';

const Register = () => {
  const [userName,setuserName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const dispatch = useDispatch();
  const {isFetching,error} = useSelector((state)=>state.auth)
  const handleClick=(e)=>{
    e.preventDefault();
    register(dispatch,{userName,email,password}).then(() => {
      window.location.href = '/login';
    });
  }
  return (
    <Helmet title='Register'>
      <CommonSection title='Register' />
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6' sm='12' className='m-auto text-center'>
              <form className='form mb-5'>
                <div className='form__group'>
                  <input onChange={(e)=>setuserName(e.target.value)}
                    type='text'
                    placeholder='Full Name'
                  ></input>
                </div>
                <div className='form__group'>
                  <input onChange={(e)=>setEmail(e.target.value)}
                    type='email'
                    placeholder='Email'
                  ></input>
                </div>
                <div className='form__group'>
                  <input onChange={(e)=>setPassword(e.target.value)}
                    type='text'
                    placeholder='Password'
                  ></input>
                </div>
                <div>{error && "Something Went Wrong"}</div>
                <button onClick={handleClick} disabled={isFetching} type='submit' className='addToCart__btn'>
                  Sign up
                </button>
              </form>
              <Link to='/login'>Already have an account? Login</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
