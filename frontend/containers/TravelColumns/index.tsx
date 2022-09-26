import {useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slider from 'react-slick';
import {useTranslation} from 'react-i18next';
import {Travel as TravelData, TravelEntity} from '../../generated/graphql';
import useEventStore from '../../stores/useEventStore';
import useToastStore from '../../stores/useToastStore';
import useProfile from '../../hooks/useProfile';
import useAddToEvents from '../../hooks/useAddToEvents';
import {AddPassengerToTravel} from '../NewPassengerDialog';
import Travel from '../Travel';
import sliderSettings from './_SliderSettings';
import usePassengersActions from '../../hooks/usePassengersActions';
import NoCar from './NoCar';

type TravelType = TravelData & {id: string};

interface Props {
  toggle: () => void;
}

const TravelColumns = (props: Props) => {
  const event = useEventStore(s => s.event);
  const travels = event?.travels?.data || [];
  const slider = useRef(null);
  const {t} = useTranslation();
  const addToast = useToastStore(s => s.addToast);
  const {addToEvent} = useAddToEvents();
  const {profile, userId} = useProfile();
  const classes = useStyles();
  const [newPassengerTravelContext, toggleNewPassengerToTravel] = useState<{
    travel: TravelType;
  } | null>(null);
  const {addPassenger} = usePassengersActions();
  const sortedTravels = travels?.slice().sort(sortTravels);

  const addSelfToTravel = async (travel: TravelType) => {
    try {
      await addPassenger({
        user: userId,
        email: profile.email,
        name: profile.username,
        travel: travel.id,
        event: event.id,
      });
      addToEvent(event.id);
      addToast(t('passenger.success.added_self_to_car'));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.dots} id="slider-dots" />
      {(travels?.length === 0 && (
        <NoCar
          image
          eventName={event?.name}
          title={t('event.no_travel.title')}
        />
      )) || (
        <Slider ref={slider} {...sliderSettings}>
          {sortedTravels?.map(({id, attributes}) => {
            const travel = {id, ...attributes};
            return (
              <Container
                key={travel.id}
                maxWidth="sm"
                className={classes.slide}
              >
                <Travel
                  travel={travel}
                  {...props}
                  getAddPassengerFunction={(addSelf: boolean) => () =>
                    addSelf
                      ? addSelfToTravel(travel)
                      : toggleNewPassengerToTravel({travel})}
                />
              </Container>
            );
          })}
          <Container maxWidth="sm" className={classes.slide}>
            <NoCar
              eventName={event?.name}
              title={t('event.no_other_travel.title')}
            />
          </Container>
        </Slider>
      )}
      {!!newPassengerTravelContext && (
        <AddPassengerToTravel
          open={!!newPassengerTravelContext}
          toggle={() => toggleNewPassengerToTravel(null)}
          travel={newPassengerTravelContext.travel}
        />
      )}
    </div>
  );
};

const sortTravels = (
  {attributes: a}: TravelEntity,
  {attributes: b}: TravelEntity
) => {
  if (!b) return 1;
  const dateA = new Date(a.departure).getTime();
  const dateB = new Date(b.departure).getTime();
  if (dateA === dateB)
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  else return dateA - dateB;
};

const useStyles = makeStyles(theme => ({
  container: {
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
          fontSize: '12px',
        },
      },
    },
    '& .slick-dots li:first-child button:before, & .slick-dots li:last-child button:before':
      {
        color: theme.palette.primary.main,
      },
  },
  slide: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(10),
    outline: 'none',
    '& > *': {
      cursor: 'default',
    },

    [theme.breakpoints.down('sm')]: {
      marginBottom: `${theme.spacing(10) + 56}px`,
    },
  },
}));

export default TravelColumns;
