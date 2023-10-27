import React, { useState } from 'react';
import CommonSection from '../components/UI/common-section/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import products from '../assets/fake-data/products';
import ProductCard from '../components/UI/product-card/ProductCard';
import '../styles/all-foods.css';
import ReactPaginate from 'react-paginate';
import '../styles/pagination.css';

const AllFoods = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  // eslint-disable-next-line array-callback-return
  const searchedProduct = products.filter((item) => {
    if (searchTerm.value === '') {
      return item;
    } else if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    }
  });
  const productPerPage = 8;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <Helmet title='All Foods'>
      <CommonSection title='All Foods' />
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6' sm='6' xs='12'>
              <div className='search__widget d-flex align-items-center justify-content-between'>
                <input
                  type='text'
                  placeholder="I'm looking for..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <i className='ri-search-line'></i>
                </span>
              </div>
            </Col>
            <Col lg='6' md='6' sm='6' xs='12' className='mb-4'>
              <div className='sorting__widget text-end'>
                <select className='w-50'>
                  <option>Default</option>
                  <option value='ascending'>Alphabetically, A-Z</option>
                  <option value='descending'>Alphabetically, Z-A</option>
                  <option value='high-price'>High price</option>
                  <option value='low-price'>Low price</option>
                </select>
              </div>
            </Col>

            {displayPage.map((item) => (
              <Col lg='3' md='4' sm='6' xs='6' key={item.id} className='mb-4'>
                <ProductCard item={item} />
              </Col>
            ))}
            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel='Prev'
                nextLabel='Next'
                containerClassName='paginationBtns'
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;
