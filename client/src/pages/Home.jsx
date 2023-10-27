import React, { useState, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet.js';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import heroImg from '../assets/images/hero.png';
import '../styles/hero-section.css';
import { Link } from 'react-router-dom';
import Category from '../components/UI/category/Category.jsx';
import '../styles/home.css';
import featureImg01 from '../assets/images/service-01.png';
import featureImg02 from '../assets/images/service-02.png';
import featureImg03 from '../assets/images/service-03.png';
import products from '../assets/fake-data/products.js';
import foodCategoryImg01 from '../assets/images/hamburger.png';
import foodCategoryImg02 from '../assets/images/pizza.png';
import foodCategoryImg03 from '../assets/images/bread.png';
import ProductCard from '../components/UI/product-card/ProductCard.jsx';
import whyImg from '../assets/images/location.png';
import networkImg from '../assets/images/network.png';
import TestimonialSlider from '../components/UI/slider/TestimonialSlider.jsx';

const featureData = [
  {
    title: 'Quick Delivery',
    imgUrl: featureImg01,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, esse.',
  },
  {
    title: 'Super Dine In',
    imgUrl: featureImg02,
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto, sapiente?',
  },
  {
    title: 'Easy Pick Up',
    imgUrl: featureImg03,
    desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora, saepe!',
  },
];
const Home = () => {
  const [category, setCategory] = useState('ALL');
  const [allProducts, setAllProducts] = useState(products);
  const [hotPizza, setHotPizza] = useState([]);

  useEffect(() => {
    const filteredPizza = products.filter((item) => item.category === 'Pizza');
    const slicePizza = filteredPizza.slice(0, 4);
    setHotPizza(slicePizza);
  }, []);
  useEffect(() => {
    if (category === 'ALL') {
      setAllProducts(products);
    }
    if (category === 'BURGER') {
      const filteredProducts = products.filter(
        (item) => item.category === 'Burger'
      );
      setAllProducts(filteredProducts);
    }
    if (category === 'PIZZA') {
      const filteredProducts = products.filter(
        (item) => item.category === 'Pizza'
      );
      setAllProducts(filteredProducts);
    }
    if (category === 'BREAD') {
      const filteredProducts = products.filter(
        (item) => item.category === 'Bread'
      );
      setAllProducts(filteredProducts);
    }
  }, [category]);
  return (
    <Helmet title='Home'>
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='hero__content'>
                <h5 className='mb-3'>
                  Fast and easy food delivery service to spoil the foodie within
                  you
                </h5>
                <h1 className='mb-4 hero__title'>
                  <span>HUNGRY?</span> just wait <br /> food at
                  <span> your door!</span>
                </h1>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat, minima.
                </p>

                <div className='hero__btns d-flex align-items-center gap-5 mt-4'>
                  <button className='order__btn d-flex align-items-center justify-content-between'>
                    Order now <i className='ri-arrow-right-s-line'></i>
                  </button>

                  <button className='all__foods-btn'>
                    <Link to='/foods'>See all foods</Link>
                  </button>
                </div>
                <div className='hero__service d-flex align-items-center gap-5 mt-5'>
                  <p className='d-flex align-items-center gap-2'>
                    <span className='shipping__icon'>
                      <i className='ri-car-line'></i>
                    </span>
                    Free Delivery
                  </p>
                  <p className='d-flex align-items-center gap-2'>
                    <span className='shipping__icon'>
                      <i className='ri-shield-check-line'></i>
                    </span>
                    100% secure checkout
                  </p>
                </div>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className='hero__img'>
                <img src={heroImg} alt='hero-img' className='w-100' />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
        <Category />
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h5 className='feature__subtitle mb-4'>What we serve</h5>
              <h2 className='feature__title'> Just sit back at home</h2>
              <h2 className='feature__title'>
                we will <span>take care</span>
              </h2>
              <p className='mb-1 mt-4 feature__text'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Laborum, deserunt.
              </p>
              <p className='mb-1 mt-4 feature__text'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error,
                ullam?
              </p>
            </Col>

            {featureData.map((item, index) => {
              return (
                <Col lg='4' md='6' sm='6' key={index} className='mt-5'>
                  <div className='feature__item text-center px-5 py-3'>
                    <img
                      className='w-25 mb-3'
                      src={item.imgUrl}
                      alt='feature-img'
                    />
                    <h5 className='fw-bold mb-3'>{item.title}</h5>
                    <p>{item.desc}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2>Populer Yemekler (ToDo) </h2>
            </Col>

            {hotPizza.map((item) => (
              <Col lg='3' md='4' key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='testimonial'>
                <h5 className='testimonial__subtitle mb-4'>Testimonial</h5>
                <h2 className='testimonial__title mb-40'>
                  What our <span>customers </span>are saying
                </h2>
                <p className='testimonial__desc'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolor accusantium magni omnis culpa cupiditate nesciunt amet,
                  fugit nam doloremque rem.
                </p>
                <TestimonialSlider />
              </div>
            </Col>
            <Col lg='6' md='6'>
              <img src={networkImg} alt='testimonial-img' className='w-100' />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
