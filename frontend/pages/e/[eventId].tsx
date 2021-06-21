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
import {
  useEventQuery,
  useUpdateEventMutation,
  Event as EventType,
} from '../../generated/graphql';
import useEventStore from '../../stores/useEventStore';

interface Props {
  eventId: string;
}

const Event = ({eventId}: Props) => {
  const {t} = useTranslation();
  const addToast = useToastStore(s => s.addToast);
  const setEvent = useEventStore(s => s.setEvent);
  const eventUpdate = useEventStore(s => s.event);
  const setIsEditing = useEventStore(s => s.setIsEditing);
  const {data: {event} = {}, loading, error} = useEventQuery({
    variables: {id: eventId},
  });
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

  if (loading) return <Loading />;

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

export default props => {
  const router = useRouter();
  const {eventId} = router.query;

  if (!eventId) return null;

  return <Event {...props} eventId={eventId} />;
};
