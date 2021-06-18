import create from 'zustand';

type Event = {
  name?: string;
  email?: string;
  newsletter?: boolean;
  date?: string;
  address?: string;
};

type State = {
  event: Event;
  setEventFields: (fields: Event) => void;
  reset: () => void;
};

const useEventStore = create<State>((set, get) => ({
  event: {},
  setEventFields: fields => {
    const event = get().event;
    set({event: {...event, ...fields}});
  },
  reset: () => set({event: {}}),
}));

export default useEventStore;
