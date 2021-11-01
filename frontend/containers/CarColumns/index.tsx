import {useRef, useEffect} from 'react';
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
  const wrapper = useRef(null);
  const slider = useRef(null);
  const event = useEventStore(s => s.event);
  const {cars} = event || {};
  const classes = useStyles();

  useEffect(() => {
    if (wrapper.current)
      wrapper.current.addEventListener('wheel', e => {
        e.preventDefault();
        if (e.deltaY < 0) slider.current.slickPrev();
        else slider.current.slickNext();
      });
  }, [wrapper, slider]);

  return (
    <div className={classes.container}>
      <div className={classes.dots} id="slider-dots" />
      <div className={classes.slider} ref={wrapper}>
        <Slider ref={slider} {...sliderSettings}>
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
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    overflow: 'hidden',
    position: 'relative',
    top: theme.mixins.toolbar.minHeight,
  },
  dots: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 20,
    width: '100%',
    height: 32,
    overflow: 'auto',
    '& overflow': '-moz-scrollbars-none',
    '-ms-overflow-style': 'none',
    '&::-webkit-scrollbar': {
      height: '0 !important',
    },
    '& .slick-dots': {
      bottom: 0,
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
    height: '100%',
    zIndex: -20,
    overflow: 'hidden',
    '& > div': {
      height: '100%',
      padding: theme.spacing(4, 6, 0, 6),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(4, 1, 0, 1),
      },
      '& .slick-list': {
        overflow: 'visible',
      },
      cursor: 'grab',
    },
  },
  slide: {
    minHeight: '100%',
    outline: 'none',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(12),
    '& > *': {
      cursor: 'default',
    },
  },
}));

export default CarColumns;
