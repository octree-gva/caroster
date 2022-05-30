import create from 'zustand';
import {Event} from '../generated/graphql';

type State = {
  event: Event;
  setEvent: (event: Event) => void;
  setEventUpdate: (event: Event) => void;
  areDetailsOpened: boolean;
  setAreDetailsOpened: (areDetailsOpened: boolean) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
};

const useEventStore = create<State>((set, get) => ({
  event: null,
  setEvent: event => set({event}),
  setEventUpdate: eventUpdate => {
    const event = get().event;
    set({event: {...event, ...eventUpdate}});
  },
  areDetailsOpened: false,
  setAreDetailsOpened: areDetailsOpened => {
    if (!areDetailsOpened) {
      set({areDetailsOpened, isEditing: false});
    }
    set({areDetailsOpened});
  },
  isEditing: false,
  setIsEditing: isEditing => set({isEditing}),
}));

export default useEventStore;
