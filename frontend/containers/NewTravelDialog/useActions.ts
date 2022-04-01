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
import useProfile from '../../hooks/useProfile';
import {DocumentNode, PureQueryOptions} from '@apollo/client/core';
import {RefetchQueriesFunction} from '@apollo/client/react/types/types';

interface Props {
  event: Event;
}

const useActions = (props: Props) => {
  const {event} = props;
  const {t} = useTranslation();
  const addToast = useToastsStore(s => s.addToast);
  const {addToEvent} = useAddToEvents();
  const [createTravelMutation] = useCreateTravelMutation();
  const {user} = useProfile();

  const createTravel = async (travelInput: TravelInput) => {
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
        variables: {travel: travelInput},
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
