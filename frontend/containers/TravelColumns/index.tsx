import {useEffect, useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slider from 'react-slick';
import {Travel as TravelType} from '../../generated/graphql';
import useEventStore from '../../stores/useEventStore';
import useTourStore from '../../stores/useTourStore';
import WaitingList from '../WaitingList';
import Travel from '../Travel';
import AddTravel from './AddTravel';
import sliderSettings from './_SliderSettings';

interface Props {
  toggleNewTravel: () => void;
}

const TravelColumns = (props: Props) => {
  const event = useEventStore(s => s.event);
  const {travels = []} = event || {};
  const slider = useRef(null);
  const tourStep = useTourStore(s => s.step);
  const classes = useStyles();

  // On tour step changes : component update
  useEffect(() => {
    onTourChange(slider.current);
  }, [tourStep]);

  return (
    <div className={classes.container}>
      <div className={classes.dots} id="slider-dots" />
      <div className={classes.slider}>
        <Slider ref={slider} {...sliderSettings}>
          <Container maxWidth="sm" className={classes.slide}>
            <WaitingList />
          </Container>
          {travels
            ?.slice()
            .sort(sortTravels)
            .map(travel => (
              <Container
                key={travel.id}
                maxWidth="sm"
                className={classes.slide}
              >
                <Travel travel={travel} {...props} />
              </Container>
            ))}
          <Container maxWidth="sm" className={classes.slide}>
            <AddTravel {...props} />
          </Container>
        </Slider>
      </div>
    </div>
  );
};

const onTourChange = slider => {
  const {prev, step, isCreator} = useTourStore.getState();
  const fromTo = (step1: number, step2: number) =>
    prev === step1 && step === step2;

  if (isCreator) {
    if (fromTo(2, 3) || fromTo(4, 3)) slider?.slickGoTo(0, true);
  } else if (fromTo(0, 1)) slider?.slickGoTo(0, true);
};

const sortTravels = (a: TravelType, b: TravelType) => {
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
    '& .slick-dots li:first-child button:before, & .slick-dots li:last-child button:before': {
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

export default TravelColumns;
