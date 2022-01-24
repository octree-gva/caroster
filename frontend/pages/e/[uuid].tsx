import {useState, useReducer, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {initializeApollo} from '../../lib/apolloClient';
import useToastStore from '../../stores/useToastStore';
import useEventStore from '../../stores/useEventStore';
import Layout from '../../layouts/Default';
import AddToMyEventDialog from '../../containers/AddToMyEventDialog';
import TravelColumns from '../../containers/TravelColumns';
import NewTravelDialog from '../../containers/NewTravelDialog';
import WelcomeDialog from '../../containers/WelcomeDialog';
import EventBar from '../../containers/EventBar';
import Loading from '../../containers/Loading';
import Fab from '../../containers/Fab';
import OnBoardingTour from '../../containers/OnBoardingTour';
import {
  useUpdateEventMutation,
  Event as EventType,
  useEventByUuidQuery,
  EventByUuidDocument,
  EditEventInput,
} from '../../generated/graphql';
import ErrorPage from '../_error';

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
  const {t} = useTranslation();
  const addToast = useToastStore(s => s.addToast);
  const setEvent = useEventStore(s => s.setEvent);
  const eventUpdate = useEventStore(s => s.event);
  const setIsEditing = useEventStore(s => s.setIsEditing);
  const [updateEvent] = useUpdateEventMutation();
  const [isAddToMyEvent, setIsAddToMyEvent] = useState(false);
  const [openNewTravel, toggleNewTravel] = useReducer(i => !i, false);
  const {data: {eventByUUID: event} = {}} = useEventByUuidQuery({
    pollInterval: POLL_INTERVAL,
    variables: {uuid: eventUUID},
  });

  useEffect(() => {
    if (event) setEvent(event as EventType);
  }, [event]);

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

  const onShare = async () => {
    if (!event) return null;
    // If navigator share capability
    if (!!navigator.share)
      return await navigator.share({
        title: `Caroster ${event.name}`,
        url: `${window.location.href}`,
      });
    // Else copy URL in clipboard
    else if (!!navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      addToast(t('event.actions.copied'));
      return true;
    }
  };

  if (!event) return <Loading />;

  return (
    <Layout
      pageTitle={t('event.title', {title: event.name})}
      menuTitle={t('event.title', {title: event.name})}
      displayMenu={false}
    >
      <EventBar
        event={event}
        onAdd={setIsAddToMyEvent}
        onSave={onSave}
        onShare={onShare}
      />
      <TravelColumns toggleNewTravel={toggleNewTravel} />
      <Fab
        color="primary"
        open={openNewTravel}
        onClick={toggleNewTravel}
        aria-label="add-travel"
      />
      <NewTravelDialog open={openNewTravel} toggle={toggleNewTravel} />
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

export default EventPage;
