import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import CommonSection from '../components/UI/common-section/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import '../styles/checkout.css';
import { createOrder } from '../store/apiCalls';
import { cartActions } from '../store/shopping-cart/cartSlice';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from 'react-router-dom';


const Checkout = () => {
  const navigate = useNavigate();
  const showSuccessToast = () => {
    toast.success("The order was created successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };
  const showErrorToast = () => {
    toast.success("Order could not be created!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };
  const user = useSelector((state) => state.auth.currentUser);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 10;
  const totalAmount = cartTotalAmount + shippingCost;
  const dispatch = useDispatch();
  
  const handlePayment = () => {
    try {
      const foods = cartItems.map((item) => ({
        foodId: item._id,
        quantity: item.quantity,
        size: item.size,
      }));
      const orderDetails = {
        userId: user._id,
        foods: foods,
        total: cartTotalAmount,
        address: user.address.city + user.address.streetAddress + user.address.postalCode,
      };
      createOrder(dispatch, orderDetails);
      showSuccessToast();
      dispatch(cartActions.clearAllItems([]));
      navigate('/home')
    } catch (error) {
      showErrorToast();
      navigate('/home')
    }
  }
  

  return (
    <Helmet title='Checkout'>
      <CommonSection title='Checkout' />
      <section>
        <Container>
          <Row>
            <Col lg='8' md='6'>
              <h6 className='mb-4'>Shipping Address And Payment Methods</h6>
              <form
                action=''
                className='checkout__form'
              >
                <div className='form__group'>
                <h5 className='mb-4'>Select Shipping Address</h5>
                  <select className='' name="" id="">
                    <option>{user.address.city} {user.address.streetAddress} {user.address.postalCode} </option>
                  </select>
                </div>
                <div className='form__group'>
                <h5 className='mb-4'>Select Payment Methods</h5>
                  <select name="" id="">
                    <option>Paypal</option>
                    <option>Bank</option>
                    <option>Cash</option>
                  </select>
                </div>
                <button type='button' className='addToCart__btn' onClick={handlePayment} >Pay for your order</button>
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
