import {useState, useReducer} from 'react';
import useAddToEvents from '../../hooks/useAddToEvents';
import Step1 from './Step1';
import Step2 from './Step2';
import {
  EventInput,
  ProfileDocument,
  useCreateEventMutation,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';

const STEPS = [Step1, Step2];

const CreateEvent = () => {
  const [step, setStep] = useState(0);
  const [event, addToEvent] = useReducer(eventReducer, {} as EventInput);
  const [sendEvent] = useCreateEventMutation();
  const {addToEvent: addToUserEvents} = useAddToEvents();
  const {locale} = useLocale();
  const Step = STEPS[step];

  const createEvent = async (eventData: EventInput) => {
    try {
      const {data} = await sendEvent({
        variables: {
          eventData: {
            ...event,
            ...eventData,
            lang: locale,
          },
        },
        refetchQueries: [ProfileDocument],
      });
      const createdEvent = data.createEvent.data;
      addToUserEvents(createdEvent.id);
      return createdEvent;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Step
      event={event}
      addToEvent={addToEvent}
      createEvent={createEvent}
      nextStep={() => setStep(step + 1)}
      previousStep={() => setStep(step - 1)}
      id="NewEvent"
    />
  );
};

const eventReducer = (state, item) => ({...state, ...item});

export default CreateEvent;
