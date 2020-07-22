import React, {useState, useReducer} from 'react';
import {useTranslation} from 'react-i18next';
import {useEvent, EventProvider} from '../contexts/Event';
import {useToast} from '../contexts/Toast';
import Layout from '../layouts/Default';
import Fab from '../containers/Fab';
import CarColumns from '../containers/CarColumns';
import NewCarDialog from '../containers/NewCarDialog';
import AddToMyEventDialog from '../containers/AddToMyEventDialog';
import Loading from './Loading';
import EventBar from '../containers/EventBar';

const Event = () => {
  const {t} = useTranslation();
  const {addToast} = useToast();
  const [isAddToMyEvent, setIsAddToMyEvent] = useState(false);
  const [openNewCar, toggleNewCar] = useReducer(i => !i, false);
  const {event, isEditing, setIsEditing, updateEvent} = useEvent();

  const onSave = async e => {
    try {
      await updateEvent();
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
      pageTitle={t('event.title')}
      menuTitle={t('meta.title', {title: event.name})}
    >
      <EventBar
        event={event}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
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

const EventWithContext = props => (
  <EventProvider {...props}>
    <Event {...props} />
  </EventProvider>
);
export default EventWithContext;
