import React, {useState, useReducer} from 'react';
import {useStrapi} from 'strapi-react-context';

// Steps
import Step1 from './Step1';
import Step2 from './Step2';

const steps = [Step1, Step2];

const eventReducer = (state, item) => ({...state, ...item});

const CreateEvent = props => {
  const strapi = useStrapi();
  const [step, setStep] = useState(0);
  const [event, addToEvent] = useReducer(eventReducer, {});
  const Step = steps[step];

  const createEvent = async eventData => {
    try {
      return await strapi.services.events.create({...event, ...eventData});
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <Step
      {...props}
      event={event}
      addToEvent={addToEvent}
      createEvent={createEvent}
      nextStep={() => setStep(step + 1)}
      previousStep={() => setStep(step - 1)}
      id="NewEvent"
    />
  );
};

export default CreateEvent;
