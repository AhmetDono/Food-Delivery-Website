import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';

const Contact = () => {
  return (
    <Helmet title='Contact'>
      <CommonSection title='Contact' />
      <section>
        <Container>
          <Row>
            <Col></Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
