import React, { useState, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet.js';
import { Container, Row, Col} from 'reactstrap';
import heroImg from '../assets/images/hero.png';
import '../styles/hero-section.css';
import { Link } from 'react-router-dom';
import Category from '../components/UI/category/Category.jsx';
import '../styles/home.css';
import featureImg01 from '../assets/images/service-01.png';
import featureImg02 from '../assets/images/service-02.png';
import featureImg03 from '../assets/images/service-03.png';
//import products from '../assets/fake-data/products.js';
import ProductCard from '../components/UI/product-card/ProductCard.jsx';
import networkImg from '../assets/images/network.png';
import TestimonialSlider from '../components/UI/slider/TestimonialSlider.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFoods } from '../store/apiCalls.js';

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
  const [hotPizza, setHotPizza] = useState([]);
  const dispacth = useDispatch();
  const food = useSelector((state)=>state.food.foods);
  useEffect(()=>{
    getAllFoods(dispacth)
  },[dispacth])

  useEffect(() => {
    // food state'i değiştiğinde çalışacak kod bloğu
    const lastFourFoods = food.slice(-4); // food state'inin son 4 öğesini al
    setHotPizza(lastFourFoods);
  }, [food]);

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
                  <Link style={{ textDecoration: "none" }} to='/foods'>
                    <button className='order__btn d-flex align-items-center justify-content-between'>
                    See All Foods <i className='ri-arrow-right-s-line'></i>
                    </button> 
                    </Link>
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
              <h2>Populer Foods </h2>
            </Col>

            {hotPizza.map((item) => (
              <Col lg='3' md='4' key={item._id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

    </Helmet>
  );
};

export default Home;
