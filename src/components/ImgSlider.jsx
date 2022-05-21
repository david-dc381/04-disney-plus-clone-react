import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImgSlider = () => {
  
  // Para que el slider funcione
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  }
  
  return (
    <Carousel {...settings}>
      <Wrap>
        <img src="/images/slider-badging.jpg" alt="slider" />
      </Wrap>
      <Wrap>
        <img src="/images/slider-badag.jpg" alt="slider" />
      </Wrap>
    </Carousel>
  )
}

export default ImgSlider;

// Slider es lo que pasamos para que el slider se muestre
const Carousel = styled(Slider)`
  margin-top: 20px;

  /* Para el tamaño y colo de los botones redondos */
  ul li button {
    &::before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  /* Para cambiar el color de un boton cuando un slider este activo */
  li.slick-active button::before {
    color: #fff;
  }

  /* Para hacer visible el boton de previous slider */
  button {
    z-index: 1;
  }


  .slick-list {
    overflow: visible;
  }
`;

const Wrap = styled.div`
  img {
    border: 4px solid transparent;
    border-radius: 4px;
    width: 100%;
    height: 100%;
    box-shadow: rgb(0 0 0 / 69%) 0 26px 30px -10px, rgb(0 0 0 / 73%) 0 16px 10px -10px;
    transition-duration: 300ms;

    &:hover {
      border: 4px solid rgba(249, 249, 249, 0.8);
    }
  }
`;