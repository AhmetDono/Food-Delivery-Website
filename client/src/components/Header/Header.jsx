import React, { useRef, useEffect } from 'react';
import { Container } from 'reactstrap';
import logo from '../../assets/images/res-logo.png';
import { NavLink, Link } from 'react-router-dom';
import '../../styles/header.css';
import { useSelector, useDispatch } from 'react-redux';
import { cartUiActions } from '../../store/shopping-cart/cartUISlice';
import { HiOutlineLogout } from 'react-icons/hi';
import { logout } from '../../store/auth';
import { RiUserLine } from 'react-icons/ri';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { BiUserCircle } from 'react-icons/bi';

const nav__links = [
  {
    display: 'Home',
    path: '/home',
  },
  {
    display: 'Foods',
    path: '/foods',
  },
  {
    display: 'Cart',
    path: '/cart',
  },
];
const Header = () => {
  const user = useSelector((state)=>state.auth.currentUser);
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');
  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };
  const handleLogout = (e) =>{
    e.preventDefault();
    dispatch(logout())
  }
  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add('header__shrink');
      } else {
        headerRef.current.classList.remove('header__shrink');
      }
    });
    return () => document.removeEventListener('scroll', headerRef);
  }, []);
  return (
    <header className='header' ref={headerRef}>
      <Container>
        <div className='nav__wrapper d-flex align-items-center justify-content-between'>
          <Link to='/home'>
            <div className='logo'>
              <img src={logo} alt='logo' />
              <h5>Foodie</h5>
            </div>
          </Link>

          {/* ======= menu ======= */}
          <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <div className='menu d-flex align-items-center gap-5 '>
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? 'active__menu' : ''
                  }
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>
          {/* ======= nav right icons ======= */}
          {/* ======= KULLANICI YOKSA ======= */}
          { !user ? (<div className='nav__right d-flex align-items-center gap-4'>
            <span className='user'>
              <Link to='/login'>
                <RiUserLine  style={{color:'black',fontSize:'20px'}} />
                <span style={{color:'black'}} >Login</span>
              </Link>
            </span>
            <span className='mobile__menu' onClick={toggleMenu}>
              <i className='ri-menu-line' />
            </span>
          </div>) :
          (
          <>
          {/* ======= KULLANICI VARSA ======= */}
          <div className='nav__right d-flex align-items-center gap-4'></div>
          <span className='cart__icon' onClick={toggleCart}>
              <i className='ri-shopping-basket-line' />
              <span className='cart__badge'>{totalQuantity}</span>
            </span>
            <span className='user'>
              <BiUserCircle style={{fontSize:'20px'}}  />
            </span>
            <span className='user'>
              <button  onClick={(e)=>handleLogout(e)} style={{ background: 'none', border: 'none' }}>
              <RiLogoutBoxRLine style={{fontSize:'20px'}}  />
              </button>
            </span>
            <span className='mobile__menu' onClick={toggleMenu}>
              <i className='ri-menu-line' />
            </span>
          </>
          )
          }
        </div>
      </Container>
    </header>
  );
};

export default Header;
