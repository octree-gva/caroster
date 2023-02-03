import {create} from 'zustand';
import {Event} from '../generated/graphql';

type State = {
  event: Event & {id: string};
  setEvent: (event: Event & {id: string}) => void;
  setEventUpdate: (event: Partial<Event & {id: string}>) => void;
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
