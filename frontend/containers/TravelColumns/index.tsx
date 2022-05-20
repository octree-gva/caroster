import {useEffect, useMemo, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slider from 'react-slick';
import {useTranslation} from 'react-i18next';
import {Travel as TravelType} from '../../generated/graphql';
import useEventStore from '../../stores/useEventStore';
import useTourStore from '../../stores/useTourStore';
import useToastStore from '../../stores/useToastStore';
import useProfile from '../../hooks/useProfile';
import useAddToEvents from '../../hooks/useAddToEvents';
import {
  AddPassengerToTravel,
  AddPassengerToWaitingList,
} from '../NewPassengerDialog';
import WaitingList from '../WaitingList';
import Travel from '../Travel';
import AddTravel from './AddTravel';
import sliderSettings from './_SliderSettings';
import usePassengersActions from '../../hooks/usePassengersActions';

interface NewPassengerDialogContext {
  addSelf: boolean;
}

interface Props {
  toggle: () => void;
}

const TravelColumns = (props: Props) => {
  const event = useEventStore(s => s.event);
  const {travels = []} = event || {};
  const slider = useRef(null);
  const {t} = useTranslation();
  const tourStep = useTourStore(s => s.step);
  const addToast = useToastStore(s => s.addToast);
  const {addToEvent} = useAddToEvents();
  const {user} = useProfile();
  const classes = useStyles();
  const [newPassengerTravelContext, toggleNewPassengerToTravel] = useState<{
    travel: TravelType;
  } | null>(null);
  const [addPassengerToWaitingListContext, toggleNewPassengerToWaitingList] =
    useState<NewPassengerDialogContext | null>(null);
  const {addPassenger} = usePassengersActions();
  const sortedTravels = travels?.slice().sort(sortTravels);

  const canAddSelf = useMemo(() => {
    if (!user) return false;
    const isInWaitingList = event?.waitingPassengers?.some(
      passenger => passenger.user?.id === `${user.id}`
    );
    const isInTravel = event?.travels.some(travel =>
      travel.passengers.some(passenger => passenger.user?.id === `${user.id}`)
    );
    return !(isInWaitingList || isInTravel);
  }, [event, user]);

  const addSelfToTravel = async (travel: TravelType) => {
    try {
      await addPassenger({
        user: user?.id,
        email: user.email,
        name: user.username,
        travel: travel.id,
      });
      addToEvent(event.id);
      addToast(t('passenger.success.added_self_to_car'));
    } catch (error) {
      console.error(error);
    }
  };

  const slideToTravel = (travelId: string) => {
    const travelIndex = sortedTravels.findIndex(
      travel => travel.id === travelId
    );
    const slideIndex = travelIndex + 1;
    slider.current.slickGoTo(slideIndex);
  };

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
            <WaitingList
              slideToTravel={slideToTravel}
              canAddSelf={canAddSelf}
              getToggleNewPassengerDialogFunction={(addSelf: boolean) => () =>
                toggleNewPassengerToWaitingList({addSelf})}
            />
          </Container>
          {sortedTravels?.map(travel => (
            <Container key={travel.id} maxWidth="sm" className={classes.slide}>
              <Travel
                travel={travel}
                {...props}
                canAddSelf={canAddSelf}
                getAddPassengerFunction={(addSelf: boolean) => () => {
                  if (addSelf) {
                    return addSelfToTravel(travel);
                  } else {
                    return toggleNewPassengerToTravel({travel});
                  }
                }}
              />
            </Container>
          ))}
          <Container maxWidth="sm" className={classes.slide}>
            <AddTravel {...props} />
          </Container>
        </Slider>
      </div>
      {!!newPassengerTravelContext && (
        <AddPassengerToTravel
          open={!!newPassengerTravelContext}
          toggle={() => toggleNewPassengerToTravel(null)}
          travel={newPassengerTravelContext.travel}
        />
      )}
      {!!addPassengerToWaitingListContext && (
        <AddPassengerToWaitingList
          open={!!addPassengerToWaitingListContext}
          toggle={() => toggleNewPassengerToWaitingList(null)}
          addSelf={addPassengerToWaitingListContext.addSelf}
        />
      )}
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
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(),
      paddingRight: theme.spacing(),
    },
    display: 'flex',
    flexDirection: 'column',
  },
  dots: {
    height: '56px',
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
        '& button:before': {
          fontSize: '20px',
        },
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

export default TravelColumns;
