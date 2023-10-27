import React from 'react';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Routes from '../../routes/Routers.js';
import Carts from '../UI/cart/Carts.jsx';
import { useSelector } from 'react-redux';
const Layout = () => {
  const showCart = useSelector((state) => state.cartUI.cartIsVisable);
  return (
    <div>
      <Header />

      {showCart && <Carts />}
      <div>
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
