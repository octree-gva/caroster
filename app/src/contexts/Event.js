import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useStrapi} from 'strapi-react-context';

const EventContext = createContext();
export default EventContext;
export const useEvent = () => useContext(EventContext);

export const EventProvider = ({match, children}) => {
  const strapi = useStrapi();
  const {eventId} = match.params;
  const [isEditing, setIsEditing] = useState(false);
  const [editingEvent, setEditingEvent] = useState({});

  // Fetch event data if not already done
  useEffect(() => {
    if (!strapi.stores.events?.find(({id}) => eventId === id))
      strapi.services.events.findOne(eventId);
  }, [eventId, strapi.stores.events, strapi.services.events]);

  // Fetch event cars on load
  useEffect(() => {
    strapi.services.cars.find({event: eventId});
  }, [eventId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Retrieve event data
  const event = useMemo(
    () => strapi.stores.events?.find(e => e.id === eventId),
    [eventId, strapi.stores.events]
  );

  const updateEvent = async () => {
    const result = await strapi.services.events.update(event.id, editingEvent);
    setEditingEvent({});
    return result;
  };

  return (
    <EventContext.Provider
      value={{
        event,
        isEditing,
        setIsEditing,
        editingEvent,
        setEditingEvent,
        updateEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
