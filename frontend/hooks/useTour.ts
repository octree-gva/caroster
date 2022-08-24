import {useEffect, useMemo} from 'react';
import {CallBackProps, STATUS, EVENTS, ACTIONS} from 'react-joyride';
import {useUpdateMeMutation} from '../generated/graphql';
import useOnboardingStore from '../stores/useOnboardingStore';
import useTourStore from '../stores/useTourStore';
import useEventStore from '../stores/useEventStore';
import useAddToEvents from '../hooks/useAddToEvents';
import useProfile from './useProfile';

const STEP_SETTINGS = {
  disableBeacon: true,
  disableOverlayClose: true,
  hideCloseButton: true,
  hideFooter: false,
  spotlightClicks: false,
  showSkipButton: true,
  styles: {
    options: {
      zIndex: 10000,
    },
  },
};

const useTour = () => {
  const isCreator = useTourStore(s => s.isCreator);
  const run = useTourStore(s => s.run);
  const step = useTourStore(s => s.step);
  const prev = useTourStore(s => s.prev);
  const setTour = useTourStore(s => s.setTour);
  const onboardingUser = useOnboardingStore(s => s.onboardingUser);
  const onboardingCreator = useOnboardingStore(s => s.onboardingCreator);
  const setOnboarding = useOnboardingStore(s => s.setOnboarding);
  const {profile, isReady} = useProfile();
  const event = useEventStore(s => s.event);
  const {eventsToBeAdded} = useAddToEvents();
  const [updateProfile] = useUpdateMeMutation();

  // Check if user is the event creator
  useEffect(() => {
    if (!isReady || !event) return;

    let newIsCreator = eventsToBeAdded.includes(event?.id);
    if (profile) newIsCreator = profile.events?.data.map(e => e.id).includes(event?.id);

    setTour({isCreator: newIsCreator});
  }, [isReady, event, eventsToBeAdded, profile]);

  const steps = useMemo(() => {
    if (isCreator === null) return [];
    return isCreator
      ? [
          {content: 'tour.creator.step1', target: '.tour_travel_add'},
          {content: 'tour.creator.step2', target: '.tour_waiting_list'},
          {content: 'tour.creator.step3', target: '.tour_event_infos'},
          {content: 'tour.creator.step4', target: '.tour_event_edit'},
          {content: 'tour.creator.step5', target: '.tour_event_share'},
        ].map(currentStep => ({...currentStep, ...STEP_SETTINGS}))
      : [
          {content: 'tour.user.step1', target: '.tour_travel_add'},
          {content: 'tour.user.step2', target: '.tour_waiting_list'},
          {content: 'tour.user.step3', target: '.tour_event_infos'},
          {content: 'tour.user.step4', target: '.tour_event_share'},
        ].map(currentStep => ({...currentStep, ...STEP_SETTINGS}));
  }, [isCreator]);

  // On step change : wait for the UI a little and run it
  useEffect(() => {
    let timer;
    if (step >= 0 && step !== prev)
      timer = setTimeout(() => setTour({run: true}), 250);
    return () => clearTimeout(timer);
  }, [step]);

  const onFinish = () => {
    if (profile) {
      if (isCreator && !profile.onboardingCreator)
        updateProfile({variables: {userUpdate: {onboardingCreator: true}}});
      else if (!isCreator && !profile.onboardingUser)
        updateProfile({variables: {userUpdate: {onboardingUser: true}}});
    } else {
      if (isCreator && !onboardingCreator)
        setOnboarding({onboardingCreator: true});
      else if (!isCreator && !onboardingUser)
        setOnboarding({onboardingUser: true});
    }
  };

  const onTourChange = (data: CallBackProps) => {
    const {action, index, type, status} = data;

    if (
      ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)
    ) {
      if (action === ACTIONS.CLOSE) {
        setTour({run: false, step: -1, prev: -1});
      } else {
        setTour({
          run: false,
          step: index + (action === ACTIONS.PREV ? -1 : 1),
          prev: index,
        });
      }
    } else if (
      ([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)
    ) {
      setTour({run: false, step: -1, prev: -1});
      if (status === STATUS.FINISHED) onFinish();
    }
  };

  return {
    run,
    steps,
    step,
    onTourChange,
  };
};

export default useTour;
