import {useTranslation} from 'react-i18next';
import {PureQueryOptions} from '@apollo/client/core';
import useToastsStore from '../../stores/useToastStore';
import useAddToEvents from '../../hooks/useAddToEvents';
import useProfile from '../../hooks/useProfile';
import {
  EventByUuidDocument,
  useCreateTravelMutation,
  TravelInput,
  FindUserVehiclesDocument,
  Event
} from '../../generated/graphql';

interface Props {
  event: Event & {id: string};
}

const useActions = (props: Props) => {
  const {event} = props;
  const {t} = useTranslation();
  const addToast = useToastsStore(s => s.addToast);
  const {addToEvent} = useAddToEvents();
  const [createTravelMutation] = useCreateTravelMutation();
  const {user} = useProfile();

  const createTravel = async (
    travelInput: TravelInput,
    createVehicle: boolean
  ) => {
    const refetchQueries: Array<PureQueryOptions> = [
      {
        query: EventByUuidDocument,
        variables: {
          uuid: event.uuid,
        },
      },
    ];
    if (user) {
      refetchQueries.push({
        query: FindUserVehiclesDocument,
      });
    }
    try {
      await createTravelMutation({
        variables: {travel: travelInput, createVehicle},
        refetchQueries,
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
