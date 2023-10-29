import React from 'react';
import CommonSection from '../components/UI/common-section/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/cart-page.css';
import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'reactstrap';
import { cartActions } from '../store/shopping-cart/cartSlice';
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title='Cart'>
      <CommonSection title='Your cart' />
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              {cartItems.length === 0 ? (
                <h5 className='text-center'>Your cart is empty</h5>
              ) : (
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Food Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <Tr item={item} key={item.id} />
                    ))}
                  </tbody>
                </table>
              )}
              <div className='mt-4'>
                <h6>
                  Subtotal:
                  <span className='cart__subtotal'> ${totalAmount}</span>
                </h6>
                <p>Taxes and shipping will be calculated at checkout</p>
                <div className='cart__page-btn'>
                  <button className='addToCart__btn me-4'>
                    <Link to='/foods'>Continue Shopping</Link>
                  </button>
                  <button className='addToCart__btn'>
                    <Link to='/checkout'>Proceed to checkout</Link>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = (props) => {
  const { _id, image, foodName, price, quantity } = props.item;
  const dispatch = useDispatch();

  const deleteItem = () => dispatch(cartActions.deleteItem(_id));
  return (
    <tr>
      <td className='text-center cart__img-box'>
        <img src={image} alt='food'></img>
      </td>
      <td className='text-center'>{foodName}</td>
      <td className='text-center'>${price}</td>
      <td className='text-center'>{quantity} pcs</td>
      <td onClick={deleteItem} className='text-center cart__item-del'>
        <i className='ri-delete-bin-line'></i>
      </td>
    </tr>
  );
};

export default Cart;
