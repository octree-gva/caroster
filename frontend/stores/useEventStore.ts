import create from 'zustand';
import {Event} from '../generated/graphql';

type State = {
  event: Event;
  setEvent: (event: Event) => void;
  setEventUpdate: (event: Event) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
};

const useEventStore = create<State>((set, get) => ({
  event: null,
  setEvent: event => set({event: formatEvent(event)}),
  setEventUpdate: eventUpdate => {
    const event = get().event;
    set({event: {...event, ...eventUpdate}});
  },
  isEditing: false,
  setIsEditing: isEditing => set({isEditing}),
}));

const formatEvent = (event: Event): Event => {
  const travels = event.travels?.filter(travel => !!travel.vehicle);
  return {...event, travels};
};

export default useEventStore;
