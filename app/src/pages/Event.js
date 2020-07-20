import React, {useState, useReducer, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useEvent, EventProvider} from '../contexts/Event';
import Layout from '../layouts/Default';
import Loading from './Loading';
import EventAppBar from '../containers/EventAppBar';
import EventFab from '../containers/EventFab';
import CarColumns from '../containers/CarColumns';
import NewCarDialog from '../containers/NewCarDialog';
import AddToMyEventDialog from '../containers/AddToMyEventDialog';

const Event = () => {
  const {t} = useTranslation();
  const [isAddToMyEvent, setIsAddToMyEvent] = useState(false);
  const [detailsOpen, toggleDetails] = useReducer(i => !i, false);
  const [openNewCar, toggleNewCar] = useReducer(i => !i, false);
  const {event, setIsEditing} = useEvent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!detailsOpen) setIsEditing(false);
  }, [detailsOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!event) return <Loading />;

  return (
    <Layout title={t('meta.event_title', {event})}>
      <EventAppBar
        detailsOpen={detailsOpen}
        toggleDetails={toggleDetails}
        setIsAddToMyEvent={setIsAddToMyEvent}
      />
      <CarColumns toggleNewCar={toggleNewCar} />
      <EventFab toggleNewCar={toggleNewCar} open={openNewCar} />
      <NewCarDialog open={openNewCar} toggle={toggleNewCar} />
      <AddToMyEventDialog
        open={isAddToMyEvent}
        onClose={() => setIsAddToMyEvent(false)}
        event={event}
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
