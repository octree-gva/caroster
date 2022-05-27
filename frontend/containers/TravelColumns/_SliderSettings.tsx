import CustomArrow from './CustomArrow';
import Dots from './Dots';

const sliderSettings = {
  accessibility: true,
  dots: true,
  appendDots: dots => <Dots>{dots}</Dots>,
  nextArrow: <CustomArrow right={0} />,
  prevArrow: <CustomArrow left={80} />,
  arrows: true,
  infinite: false,
  speed: 500,
  initialSlide: 0,
  lazyLoad: true,
  draggable: true,
  swipeToSlide: false,
  swipe: true,
  slidesToScroll: 5,
  slidesToShow: 5,
  autoPlay: false,
  responsive: [
    {
      breakpoint: 720,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToScroll: 2,
        slidesToShow: 2,
        arrows: false,
      },
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToScroll: 2,
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 1920,
      settings: {
        slidesToScroll: 3,
        slidesToShow: 3,
      },
    },
  ],
};

export default sliderSettings;
