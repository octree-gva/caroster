import {useState, useReducer} from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import {useCreateEventMutation} from '../../generated/graphql';

const STEPS = [Step1, Step2];

const CreateEvent = () => {
  const [step, setStep] = useState(0);
  const [event, addToEvent] = useReducer(eventReducer, {});
  const [sendEvent] = useCreateEventMutation();
  const Step = STEPS[step];

  const createEvent = async eventData => {
    try {
      const variables = {...event, ...eventData};
      const {data} = await sendEvent({variables});
      const returnedEvent = data.createEvent.event;
      return returnedEvent;
    } catch (err) {
      console.error(err);
      return false;
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