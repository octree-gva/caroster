import create from 'zustand';
import {Event} from '../generated/graphql';

type State = {
  event: Event;
  setEvent: (event: Event) => void;
  setEventUpdate: (event: Partial<Event>) => void;
};

const useEventStore = create<State>((set, get) => ({
  event: null,
  setEvent: event => set({event}),
  setEventUpdate: eventUpdate => {
    const event = get().event;
    set({event: {...event, ...eventUpdate}});
  },
}));

export default useEventStore;
