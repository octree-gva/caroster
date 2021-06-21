import {useCallback} from 'react';
import {useUpdateMeMutation} from '../generated/graphql';
import useAuthStore from '../stores/useAuthStore';
import create from 'zustand';
import {persist} from 'zustand/middleware';

type Store = {
  eventsToBeAdded: string[];
  addEvent: (eventId: string) => void;
  clear: () => void;
};

const store = create<Store>(
  persist(
    (set, get) => ({
      eventsToBeAdded: [],
      addEvent: eventId =>
        set({eventsToBeAdded: [...get().eventsToBeAdded, eventId]}),
      clear: () => set({eventsToBeAdded: []}),
    }),
    {
      name: 'add-events',
    }
  )
);

const useAddToEvents = () => {
  const [updateProfile] = useUpdateMeMutation();
  const isAuth = useAuthStore(s => !!s.token);
  const eventsToBeAdded = store(s => s.eventsToBeAdded);
  const addEvent = store(s => s.addEvent);
  const clearStore = store(s => s.clear);

  const saveStoredEvents = useCallback(() => {
    if (eventsToBeAdded.length > 0) {
      updateProfile({
        variables: {
          userUpdate: {
            events: eventsToBeAdded,
          },
        },
      });
      clearStore();
    }
  }, [eventsToBeAdded]);

  const addToEvent = (eventId: string) => {
    if (isAuth) {
      updateProfile({
        variables: {
          userUpdate: {
            events: [eventId],
          },
        },
      });
    } else addEvent(eventId);
  };

  return {saveStoredEvents, addToEvent};
};

export default useAddToEvents;
