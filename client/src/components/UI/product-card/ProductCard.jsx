import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/product-card.css';
import { useDispatch, useSelector  } from 'react-redux';
import { cartActions } from '../../../store/shopping-cart/cartSlice';
const ProductCard = (props) => {

  const isFetching = useSelector((state) => state.food.isFetching);
  const { _id, foodName, image, price } = props.item;
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        _id,
        foodName,
        image,
        price,
      })
    );
  };


  return (
    
    <div className='product__item'>
    {isFetching ? (
      <div>
        <div className='product__img'>
          <div className='gray-box' ></div>
      </div>
      <div className='product__content'>
        <div className='d-flex align-items-center justify-content-between'>
          <button className='addToCart__btn'>
            Add to cart
          </button>
        </div>
      </div>
      </div>
    ) : ( 
      <>
            <div className='product__img'>
        <img src={image} alt='product-img' className='w-50' />
      </div>
      <div className='product__content'>
        <h5>
          <Link to={`/foods/${_id}`}>{foodName}</Link>
        </h5>
        <div className='d-flex align-items-center justify-content-between'>
          <span className='product__price'>${price}</span>
          <button onClick={addToCart} className='addToCart__btn'>
            Add to cart
          </button>
        </div>
      </div>
      </>
     )}
    </div>
  );
};

export default ProductCard;
