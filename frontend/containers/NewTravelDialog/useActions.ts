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
  Event,
} from '../../generated/graphql';
import {getAdressCoordinates} from '../../lib/geo';

interface Props {
  event: Event & {id: string};
}

const useActions = (props: Props) => {
  const {event} = props;
  const {t} = useTranslation();
  const addToast = useToastsStore(s => s.addToast);
  const {addToEvent} = useAddToEvents();
  const [createTravelMutation] = useCreateTravelMutation();
  const {connected} = useProfile();
  const eventCoordinates =
    event?.latitude &&
    event?.longitude &&
    `${event.longitude},${event.latitude}`;

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
    if (connected) {
      refetchQueries.push({
        query: FindUserVehiclesDocument,
      });
    }
    try {
      const coordinates =
        travelInput?.meeting &&
        (await getAdressCoordinates(travelInput.meeting, eventCoordinates));

      await createTravelMutation({
        variables: {
          travel: {
            ...travelInput,
            meeting_latitude: coordinates?.latitude,
            meeting_longitude: coordinates?.longitude,
          },
          createVehicle,
        },
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
