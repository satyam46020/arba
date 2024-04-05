import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image1 from '../Assets/image1.jpg';
import Image2 from '../Assets/image2.webp';
import Image3 from '../Assets/image3.jpg';
import { Box } from '@chakra-ui/react';

const SimpleCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Box >
      <Slider {...settings}>
        <Box paddingLeft="30%" >
          <img src={Image1} alt="Image 1" style={{ width: '60%', maxHeight: '500px', border:'10px solid black' }} />
        </Box>
        <Box paddingLeft="30%">
          <img src={Image2} alt="Image 2" style={{ width: '60%', maxHeight: '500px', border:'10px solid black' }} />
        </Box>
        <Box paddingLeft="30%">
          <img src={Image3} alt="Image 3" style={{ width: '60%', maxHeight: '500px', border:'10px solid black' }} />
        </Box>
      </Slider>
    </Box>
  );
};

export default SimpleCarousel;
