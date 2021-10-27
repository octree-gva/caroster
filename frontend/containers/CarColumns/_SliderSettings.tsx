import Box from '@material-ui/core/Box';
import CustomArrow from './CustomArrow';

const sliderSettings = {
  accessibility: true,
  dots: true,
  appendDots: dots => (
    <Box
      top={0}
      left={0}
      p={1}
      height={36}
      component="ul"
      overflow="auto"
      display="flex"
    >
      <Box display="flex" margin="0 auto">
        {dots}
      </Box>
    </Box>
  ),
  nextArrow: <CustomArrow right={16} />,
  prevArrow: <CustomArrow left={16} />,
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
  responsive: [
    {
      breakpoint: 600,
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
        slidesToScroll: 3,
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1920,
      settings: {
        slidesToScroll: 4,
        slidesToShow: 4,
      },
    },
  ],
};

export default sliderSettings;
