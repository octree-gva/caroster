import {useState, useReducer, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import Layout from '../../layouts/Default';
import Fab from '../../containers/Fab';
import CarColumns from '../../containers/CarColumns';
import NewCarDialog from '../../containers/NewCarDialog';
import AddToMyEventDialog from '../../containers/AddToMyEventDialog';
import Loading from '../../containers/Loading';
import EventBar from '../../containers/EventBar';
import useToastStore from '../../stores/useToastStore';
import {initializeApollo} from '../../lib/apolloClient';
import {
  useUpdateEventMutation,
  Event as EventType,
  EventDocument,
} from '../../generated/graphql';
import useEventStore from '../../stores/useEventStore';

interface Props {
  event: EventType;
}

const Event = ({event}: Props) => {
  const {t} = useTranslation();
  const addToast = useToastStore(s => s.addToast);
  const setEvent = useEventStore(s => s.setEvent);
  const eventUpdate = useEventStore(s => s.event);
  const setIsEditing = useEventStore(s => s.setIsEditing);
  const [updateEvent] = useUpdateEventMutation();
  const [isAddToMyEvent, setIsAddToMyEvent] = useState(false);
  const [openNewCar, toggleNewCar] = useReducer(i => !i, false);

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

export async function getServerSideProps(context) {
  const {eventId} = context.query;
  const apolloClient = initializeApollo();
  const {data = {}} = await apolloClient.query({
    query: EventDocument,
    variables: {id: eventId},
  });
  const {event} = data;

  return {
    props: {
      event,
      meta: {
        title: event?.name,
      },
    },
  };
}

export default props => {
  const router = useRouter();
  const {eventId} = router.query;

  if (!eventId) return null;

  return <Event {...props} eventId={eventId} />;
};
