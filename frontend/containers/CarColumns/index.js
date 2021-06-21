import {useRef, useEffect} from 'react';
import Slider from 'react-slick';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import WaitingList from '../WaitingList';
import Car from '../Car';
import AddCar from './AddCar';
import useEventStore from '../../stores/useEventStore';

const CarColumns = ({...props}) => {
  const wrapper = useRef();
  const slider = useRef();
  const classes = useStyles();
  const event = useEventStore(s => s.event);
  const {cars} = event || {};

  useEffect(() => {
    if (wrapper.current)
      wrapper.current.addEventListener('wheel', e => {
        e.preventDefault();
        if (e.deltaY < 0) slider.current.slickPrev();
        else slider.current.slickNext();
      });
  }, [wrapper, slider]);

  return (
    <div ref={wrapper}>
      <Slider className={classes.slider} ref={slider} {...SETTINGS}>
        <Container maxWidth="sm" className={classes.slide}>
          <WaitingList />
        </Container>
        {cars?.length > 0 &&
          cars
            .slice()
            .sort(sortCars)
            .map(car => (
              <Container key={car.id} maxWidth="sm" className={classes.slide}>
                <Car car={car} {...props} />
              </Container>
            ))}
        <Container maxWidth="sm" className={classes.slide}>
          <AddCar {...props} />
        </Container>
      </Slider>
    </div>
  );
};

const sortCars = (a, b) => {
  if (!b) return 1;
  const dateA = new Date(a.departure).getTime();
  const dateB = new Date(b.departure).getTime();
  if (dateA === dateB) return new Date(a.createdAt) - new Date(b.createdAt);
  else return dateA - dateB;
};

const SETTINGS = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
  lazyLoad: true,
  swipeToSlide: true,
  swipe: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
      },
    },
  ],
};

const useStyles = makeStyles(theme => ({
  slider: {
    marginTop: theme.mixins.toolbar.minHeight,
    padding: theme.spacing(1),
    overflow: 'hidden',
    '& .slick-list': {
      overflow: 'visible',
    },
  },
  slide: {
    minHeight: `calc(100vh - ${
      theme.mixins.toolbar.minHeight + theme.spacing(14)
    }px)`,
    outline: 'none',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(12),
  },
}));

export default CarColumns;
