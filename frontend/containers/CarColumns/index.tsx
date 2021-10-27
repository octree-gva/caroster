import {useRef, useEffect} from 'react';
import Slider from 'react-slick';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import WaitingList from '../WaitingList';
import Car from '../Car';
import AddCar from './AddCar';
import useEventStore from '../../stores/useEventStore';
import sliderSettings from './_SliderSettings';
import {Car as CarType} from '../../generated/graphql';

interface Props {
  toggleNewCar: () => void;
}

const CarColumns = (props: Props) => {
  const wrapper = useRef();
  const slider = useRef();
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
    <Box ref={wrapper}>
      <Slider className={classes.slider} ref={slider} {...sliderSettings}>
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
    </Box>
  );
};

const sortCars = (a: CarType, b: CarType) => {
  if (!b) return 1;
  const dateA = new Date(a.departure).getTime();
  const dateB = new Date(b.departure).getTime();
  if (dateA === dateB) return new Date(a.createdAt) - new Date(b.createdAt);
  else return dateA - dateB;
};

const useStyles = makeStyles(theme => ({
  slider: {
    marginTop: theme.mixins.toolbar.minHeight,
    padding: theme.spacing(1, 6),
    overflow: 'hidden',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },

    '& .slick-list': {
      overflow: 'visible',
    },
    '& .slick-dots': {
      '& li': {
        display: 'block',
      },
    },
  },
  slide: {
    marginTop: 24,
    minHeight: `calc(100vh - ${
      theme.mixins.toolbar.minHeight + theme.spacing(14) + 36
    }px)`,
    outline: 'none',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(12),
  },
}));

export default CarColumns;
