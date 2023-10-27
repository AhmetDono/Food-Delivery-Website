import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/apiCalls';

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
    <Helmet title='Login'>
      <CommonSection title='Login' />
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6' sm='12' className='m-auto text-center'>
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
              <Link to='/register'>First time here? Create an account</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
