import {useState, useReducer, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import Layout from '../../layouts/Default';
import Fab from '../../containers/Fab';
import CarColumns from '../../containers/CarColumns';
import NewCarDialog from '../../containers/NewCarDialog';
import AddToMyEventDialog from '../../containers/AddToMyEventDialog';
import EventBar from '../../containers/EventBar';
import useToastStore from '../../stores/useToastStore';
import {initializeApollo} from '../../lib/apolloClient';
import ErrorPage from '../_error';
import {
  useUpdateEventMutation,
  Event as EventType,
  useEventByUuidQuery,
  EventByUuidDocument,
} from '../../generated/graphql';
import useEventStore from '../../stores/useEventStore';
import Loading from '../../containers/Loading';

interface Props {
  event: EventType;
  eventUUID: string;
}

const EventPage = props => {
  const {event} = props;
  const {t} = useTranslation();

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
  const [openNewCar, toggleNewCar] = useReducer(i => !i, false);
  const {data: {eventByUUID: event} = {}} = useEventByUuidQuery({
    variables: {uuid: eventUUID},
  });

  useEffect(() => {
    if (event) setEvent(event as EventType);
  }, [event]);

  const onSave = async e => {
    try {
      const {id, ...data} = eventUpdate;
      delete data.__typename;
      delete data.cars;
      await updateEvent({variables: {id, eventUpdate: data}});
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      addToast(t('event.errors.cant_update'));
    }
  };

  const onShare = async () => {
    if (!event) return null;
    // If navigator as share capability
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
      <CarColumns toggleNewCar={toggleNewCar} />
      <Fab onClick={toggleNewCar} open={openNewCar} aria-label="add-car" />
      <NewCarDialog open={openNewCar} toggle={toggleNewCar} />
      <AddToMyEventDialog
        event={event}
        open={isAddToMyEvent}
        onClose={() => setIsAddToMyEvent(false)}
      />
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
