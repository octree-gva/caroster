import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {EventInput} from '../generated/graphql';

interface State {
  ready: boolean;
  event: Partial<EventInput>;
  setField: (fieldName: keyof EventInput, value: unknown) => void;
}

const useEventCreationStore = create<State>()(
  persist(
    (set, get) => ({
      ready: false,
      event: {
        name: '',
        email: '',
      },
      setField: (field, value) => {
        const currentEvent = get().event;
        set({event: {...currentEvent, [field]: value}});
      },
    }),
    {
      name: 'event-creation',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => state => {
        if (state) state.ready = true;
      },
    }
  )
);

export default useEventCreationStore;
