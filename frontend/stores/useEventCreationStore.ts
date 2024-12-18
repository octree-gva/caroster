import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {EventInput} from '../generated/graphql';

interface State {
  event: Partial<EventInput>;
  setField: (fieldName: keyof EventInput, value: unknown) => void;
}

const useEventCreationStore = create<State>()(
  persist(
    (set, get) => ({
      event: {},
      setField: (field, value) => {
        const currentEvent = get().event;
        set({event: {...currentEvent, [field]: value}});
      },
    }),
    {
      name: 'event-creation',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useEventCreationStore;
