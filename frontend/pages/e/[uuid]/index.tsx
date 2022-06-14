import {useState, useReducer, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {initializeApollo} from '../../../lib/apolloClient';
import useToastStore from '../../../stores/useToastStore';
import useEventStore from '../../../stores/useEventStore';
import Layout from '../../../layouts/Default';
import AddToMyEventDialog from '../../../containers/AddToMyEventDialog';
import TravelColumns from '../../../containers/TravelColumns';
import NewTravelDialog from '../../../containers/NewTravelDialog';
import VehicleChoiceDialog from '../../../containers/VehicleChoiceDialog';
import WelcomeDialog from '../../../containers/WelcomeDialog';
import EventBar from '../../../containers/EventBar';
import Loading from '../../../containers/Loading';
import OnBoardingTour from '../../../containers/OnBoardingTour';
import {
  useUpdateEventMutation,
  Event as EventType,
  useEventByUuidQuery,
  EventByUuidDocument,
  EditEventInput,
  useFindUserVehiclesQuery,
} from '../../../generated/graphql';
import ErrorPage from '../../_error';
import useProfile from '../../../hooks/useProfile';
import Fab from '../../../containers/Fab';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useBannerStore from '../../../stores/useBannerStore';
import DrawerMenu from '../../../containers/DrawerMenu';

const POLL_INTERVAL = 10000;

interface Props {
  event: EventType;
  eventUUID: string;
}

const EventPage = props => {
  const {t} = useTranslation();
  const {event} = props;
  if (!event) return <ErrorPage statusCode={404} title={t`event.not_found`} />;
  return <Event {...props} />;
};

const Event = (props: Props) => {
  const {eventUUID} = props;
  const bannerOffset = useBannerStore(s => s.offset);
  const classes = useStyles({bannerOffset});
  const {t} = useTranslation();
  const {user} = useProfile();
  const {data: {me: {profile: {vehicles = []} = {}} = {}} = {}, loading} =
    useFindUserVehiclesQuery();
  const addToast = useToastStore(s => s.addToast);
  const setEvent = useEventStore(s => s.setEvent);
  const eventUpdate = useEventStore(s => s.event);
  const setIsEditing = useEventStore(s => s.setIsEditing);
  const [updateEvent] = useUpdateEventMutation();
  const [isAddToMyEvent, setIsAddToMyEvent] = useState(false);
  const [openNewTravelContext, toggleNewTravel] = useState({opened: false});
  const [openVehicleChoice, toggleVehicleChoice] = useReducer(i => !i, false);
  const {data: {eventByUUID: event} = {}} = useEventByUuidQuery({
    pollInterval: POLL_INTERVAL,
    variables: {uuid: eventUUID},
  });

  const onSave = async e => {
    try {
      const {uuid, ...data} = eventUpdate;
      const {id, __typename, travels, users, waitingList, ...input} = data;
      await updateEvent({
        variables: {uuid, eventUpdate: input as EditEventInput},
        refetchQueries: ['eventByUUID'],
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      addToast(t('event.errors.cant_update'));
    }
  };

  useEffect(() => {
    if (event) setEvent(event as EventType);
  }, [event]);

  const addTravelClickHandler =
    user && vehicles?.length != 0
      ? toggleVehicleChoice
      : () => toggleNewTravel({opened: true});

  if (!event || loading) return <Loading />;

  return (
    <Layout
      className={classes.layout}
      pageTitle={t('event.title', {title: event.name})}
      menuTitle={t('event.title', {title: event.name})}
      displayMenu={false}
    >
      <EventBar event={event} onAdd={setIsAddToMyEvent} onSave={onSave} />
      <DrawerMenu />
      <TravelColumns toggle={addTravelClickHandler} />
      <Fab
        onClick={addTravelClickHandler}
        aria-label="add-car"
        color="primary"
        className={classes.bottomRight}
      >
        {t('travel.creation.title')}
      </Fab>
      <NewTravelDialog
        context={openNewTravelContext}
        toggle={() => toggleNewTravel({opened: false})}
      />
      <VehicleChoiceDialog
        open={openVehicleChoice}
        toggle={toggleVehicleChoice}
        toggleNewTravel={toggleNewTravel}
        vehicles={vehicles}
      />
      <AddToMyEventDialog
        event={event}
        open={isAddToMyEvent}
        onClose={() => setIsAddToMyEvent(false)}
      />
      <WelcomeDialog />
      <OnBoardingTour />
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const {uuid} = ctx.query;
  const apolloClient = initializeApollo();
  const {data = {}} = await apolloClient.query({
    query: EventByUuidDocument,
    variables: {uuid},
  });
  const {eventByUUID: event} = data;
  const {host = ''} = ctx.req.headers;

  return {
    props: {
      event,
      eventUUID: uuid,
      metas: {
        title: event?.name || '',
        url: `https://${host}${ctx.resolvedUrl}`,
      },
    },
  };
}

const useStyles = makeStyles(theme => ({
  layout: ({bannerOffset}) => ({
    paddingTop: theme.mixins.toolbar.minHeight + bannerOffset,
  }),
  bottomRight: {
    bottom: 0,
    right: theme.spacing(6),

    [theme.breakpoints.down('sm')]: {
      right: theme.spacing(1),
      bottom: 56,
    },
  },
}));

export default EventPage;
