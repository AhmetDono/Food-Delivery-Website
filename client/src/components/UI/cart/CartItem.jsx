import React from 'react';
import { ListGroupItem } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/shopping-cart/cartSlice';
import '../../../styles/cart-item.css';
const CartItem = ({ item }) => {
  const { id, title, price, image01, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  const increaseItem = () => {
    dispatch(cartActions.addItem({ id, title, price, image01 }));
  };
  const decreaseItem = () => {
    dispatch(cartActions.removeItem(id));
  };
  const deleteItem = () => {
    dispatch(cartActions.deleteItem(id));
  };
  return (
    <ListGroupItem className='border-0 cart__item' key={id}>
      <div className='cart__item-info d-flex gap-2'>
        <img src={image01} alt='product-img' />
        <div className='cart__product-info w-100 d-flex align-items-center justify-content-between gap-4'>
          <div>
            <h6 className='cart__product-title'>{title}</h6>
            <p className='d-flex align-items-center gap-5 cart__product-price'>
              x {quantity} = <span>${totalPrice}</span>
            </p>
            <div className='d-flex align-items-center justify-content-between increase__decrease-btn'>
              <span onClick={increaseItem} className='increase__btn'>
                <i className='ri-add-line' />
              </span>
              <span className='quantity'>{quantity}</span>
              <span onClick={decreaseItem} className='decrease__btn'>
                <i className='ri-subtract-line' />
              </span>
            </div>
          </div>
          <span className='delete__btn' onClick={deleteItem}>
            <i className='ri-close-line' />
          </span>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;
