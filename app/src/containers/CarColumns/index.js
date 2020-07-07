import React, {useMemo} from 'react';
import Slider from 'react-slick';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import {useStrapi} from 'strapi-react-context';
import {useEvent} from '../../contexts/Event';
import WaitingList from '../WaitingList';
import Car from '../Car';
import AddCar from './AddCar';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
  lazyLoad: true,
  swipeToSlide: true,
  swipe: true,
  adaptiveHeight: true,
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

const sortCars = (a, b) => {
  const dateA = new Date(a.departure).getTime();
  const dateB = new Date(b.departure).getTime();
  if (dateA === dateB) return new Date(a.createdAt) - new Date(b.createdAt);
  else return dateA - dateB;
};

const CarColumns = ({...props}) => {
  const classes = useStyles();
  const strapi = useStrapi();
  const {event} = useEvent();

  const cars = useMemo(
    () =>
      strapi.stores.cars
        ?.filter(car => car?.event?.id === event?.id)
        .sort(sortCars),
    [strapi.stores.cars, event]
  );

  return (
    <Slider className={classes.slider} {...settings}>
      <Container maxWidth="sm" className={classes.slide}>
        <WaitingList />
      </Container>
      {cars &&
        cars.map(car => (
          <Container key={car.id} maxWidth="sm" className={classes.slide}>
            <Car car={car} {...props} />
          </Container>
        ))}
      <Container maxWidth="sm" className={classes.slide}>
        <AddCar {...props} />
      </Container>
    </Slider>
  );
};

const useStyles = makeStyles(theme => ({
  slider: {
    padding: theme.spacing(1),
  },
  slide: {
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - ${theme.spacing(
      2
    )})`,
    outline: 'none',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(10),
  },
}));

export default CarColumns;
