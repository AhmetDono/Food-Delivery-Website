import React from 'react';
import Slider from 'react-slick';
import ava01 from '../../../assets/images/ava-1.jpg';
import ava02 from '../../../assets/images/ava-2.jpg';
import ava03 from '../../../assets/images/ava-3.jpg';
import ava04 from '../../../assets/images/ava-4.jpg';
import '../../../styles/slider.css';

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    autoPlay: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <p className='review__text'>
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nesciunt
          dignissimos iure perspiciatis atque voluptas? Modi quae corporis ad ea
          corrupti itaque voluptatum, sapiente optio laudantium accusamus
          molestiae, natus eum?"
        </p>
        <div className='slider__content d-flex align-items-center gap-3'>
          <img src={ava01} alt='avatar' className=' rounded' />
          <h6>John Doe</h6>
        </div>
      </div>
      <div>
        <p className='review__text'>
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro
          exercitationem magni esse asperiores mollitia repellat similique
          excepturi necessitatibus odit. Odit unde rerum distinctio voluptate
          vero quo esse autem similique dolorem!"
        </p>
        <div className='slider__content d-flex align-items-center gap-3'>
          <img src={ava02} alt='avatar' className='rounded' />
          <h6>Steven Crock</h6>
        </div>
      </div>
      <div>
        <p className='review__text'>
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur
          laudantium, aliquam obcaecati pariatur quam odit aperiam quasi
          explicabo at fugit, reiciendis, sunt atque mollitia nulla. Similique
          consequuntur ipsum illum facilis?"
        </p>
        <div className='slider__content d-flex align-items-center gap-3'>
          <img src={ava03} alt='avatar' className=' rounded' />
          <h6>Missi Lou</h6>
        </div>
      </div>
      <div>
        <p className='review__text'>
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam,
          veritatis molestias repudiandae deleniti doloribus porro deserunt
          optio dolorem. Amet temporibus veniam omnis vel officiis mollitia,
          tenetur laudantium animi eos suscipit?"
        </p>
        <div className='slider__content d-flex align-items-center gap-3'>
          <img src={ava04} alt='avatar' className=' rounded' />
          <h6>Karen Doe</h6>
        </div>
      </div>
    </Slider>
  );
};

export default TestimonialSlider;
