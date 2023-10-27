import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import CommonSection from '../components/UI/common-section/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import '../styles/checkout.css';
const Checkout = () => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredNumber, setEnteredNumber] = useState('');
  const [enteredAddress, setEnteredAddress] = useState('');
  const [enteredCity, setEnteredCity] = useState('');
  const [enteredPostalCode, setEnteredPostalCode] = useState('');
  const [enteredCountry, setEnteredCountry] = useState('');

  const shippingInfo = [];
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 10;
  const totalAmount = cartTotalAmount + shippingCost;
  const submitHandler = (e) => {
    e.preventDefault();
    const userShippingAddress = {
      name: enteredName,
      email: enteredEmail,
      phone: enteredNumber,
      address: enteredAddress,
      city: enteredCity,
      postalCode: enteredPostalCode,
      country: enteredCountry,
    };

    shippingInfo.push(userShippingAddress);
    console.log(shippingInfo);
  };
  return (
    <Helmet title='Checkout'>
      <CommonSection title='Checkout' />
      <section>
        <Container>
          <Row>
            <Col lg='8' md='6'>
              <h6 className='mb-4'>Shipping Address</h6>
              <form
                action=''
                className='checkout__form'
                onSubmit={submitHandler}
              >
                <div className='form__group'>
                  <input
                    required
                    type='text'
                    placeholder='Name'
                    onChange={(e) => setEnteredName(e.target.value)}
                  />
                </div>
                <div className='form__group'>
                  <input
                    required
                    type='email'
                    placeholder='Email'
                    onChange={(e) => setEnteredEmail(e.target.value)}
                  />
                </div>
                <div className='form__group'>
                  <input
                    required
                    type='number'
                    placeholder='Phone number'
                    onChange={(e) => setEnteredNumber(e.target.value)}
                  />
                </div>
                <div className='form__group'>
                  <input
                    required
                    type='text'
                    placeholder='Street Address'
                    onChange={(e) => setEnteredAddress(e.target.value)}
                  />
                </div>
                <div className='form__group'>
                  <input
                    required
                    type='text'
                    placeholder='City'
                    onChange={(e) => setEnteredCity(e.target.value)}
                  />
                </div>
                <div className='form__group'>
                  <input
                    required
                    type='number'
                    placeholder='Postal code'
                    onChange={(e) => setEnteredPostalCode(e.target.value)}
                  />
                </div>
                <div className='form__group'>
                  <input
                    required
                    type='text'
                    placeholder='Country'
                    onChange={(e) => setEnteredCountry(e.target.value)}
                  />
                </div>
                <button className='addToCart__btn'>Pay for your order</button>
              </form>
            </Col>
            <Col lg='4' md='6'>
              <div className='checkout__bill'>
                <h6 className='d-flex align-items-center justify-content-between mb-3'>
                  Subtotal:<span>${cartTotalAmount}</span>
                </h6>
                <h6 className='d-flex align-items-center justify-content-between mb-3'>
                  Shipping fee:<span>${shippingCost}</span>
                </h6>
                <div className='checkout__total'>
                  <h5 className='d-flex align-items-center justify-content-between'>
                    Total: <span>${totalAmount}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
