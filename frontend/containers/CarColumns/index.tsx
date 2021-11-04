import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slider from 'react-slick';
import WaitingList from '../WaitingList';
import useEventStore from '../../stores/useEventStore';
import {Car as CarType} from '../../generated/graphql';
import Car from '../Car';
import AddCar from './AddCar';
import sliderSettings from './_SliderSettings';

interface Props {
  toggleNewCar: () => void;
}

const CarColumns = (props: Props) => {
  const event = useEventStore(s => s.event);
  const {cars} = event || {};
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.dots} id="slider-dots" />
      <div className={classes.slider}>
        <Slider {...sliderSettings}>
          <Container maxWidth="sm" className={classes.slide}>
            <WaitingList />
          </Container>
          {cars
            ?.slice()
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
    </div>
  );
};

const sortCars = (a: CarType, b: CarType) => {
  if (!b) return 1;
  const dateA = new Date(a.departure).getTime();
  const dateB = new Date(b.departure).getTime();
  if (dateA === dateB)
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  else return dateA - dateB;
};

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '100vh',
    paddingTop: theme.mixins.toolbar.minHeight,
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(),
      paddingRight: theme.spacing(),
    },
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  dots: {
    height: 32,
    overflow: 'auto',
    '& overflow': '-moz-scrollbars-none',
    '-ms-overflow-style': 'none',
    '&::-webkit-scrollbar': {
      height: '0 !important',
    },
    '& .slick-dots': {
      position: 'static',
      '& li': {
        display: 'block',
      },
    },
    '& .slick-dots li:first-child button:before, & .slick-dots li:last-child button:before':
      {
        color: theme.palette.primary.main,
      },
  },
  slider: {
    flexGrow: 1,
    height: 1,
    '& .slick-slider': {
      height: '100%',
      '& .slick-list': {
        overflow: 'visible',
      },
      cursor: 'grab',
    },
  },
  slide: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(12),
    outline: 'none',
    '& > *': {
      cursor: 'default',
    },
  },
}));

export default CarColumns;
