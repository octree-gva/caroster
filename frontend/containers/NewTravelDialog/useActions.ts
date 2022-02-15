import moment from 'moment';
import {useTranslation} from 'react-i18next';
import useToastsStore from '../../stores/useToastStore';
import useAddToEvents from '../../hooks/useAddToEvents';
import {
  Event,
  EventByUuidDocument,
  useCreateTravelMutation,
  TravelInput,
  FindUserVehiclesDocument,
} from '../../generated/graphql';

interface Props {
  event: Event;
}

const useActions = (props: Props) => {
  const {event} = props;
  const {t} = useTranslation();
  const addToast = useToastsStore(s => s.addToast);
  const {addToEvent} = useAddToEvents();
  const [createTravelMutation] = useCreateTravelMutation();

  const createTravel = async (travelInput: TravelInput) => {
    try {
      await createTravelMutation({
        variables: {travel: travelInput},
        refetchQueries: [
          {
            query: EventByUuidDocument,
            variables: {
              uuid: event.uuid,
            },
          },
          {
            query: FindUserVehiclesDocument,
          },
        ],
      });
      addToEvent(event.id);
      addToast(t('travel.creation.created'));
    } catch (error) {
      console.error(error);
      addToast(t('travel.errors.cant_create'));
    }
  };

  return {createTravel};
};

export default useActions;
