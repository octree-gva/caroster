import {useTranslation} from 'react-i18next';
import useEventStore from '../../stores/useEventStore';
import useToastStore from '../../stores/useToastStore';
import {
  useUpdateTravelMutation,
  useDeleteTravelMutation,
  EventByUuidDocument,
  Travel,
  useUpdatePassengerMutation,
  TravelInput
} from '../../generated/graphql';

interface Props {
  travel: Travel & {id: string};
}

const useActions = (props: Props) => {
  const {travel} = props;
  const {t} = useTranslation();
  const event = useEventStore(s => s.event);
  const addToast = useToastStore(s => s.addToast);
  const [updateTravelMutation] = useUpdateTravelMutation();
  const [deleteTravelMutation] = useDeleteTravelMutation();
  const [updatePassenger] = useUpdatePassengerMutation();

  const sendPassengerToWaitingList = async (passengerId: string) => {
    try {
      await updatePassenger({
        variables: {
          id: passengerId,
          passengerUpdate: {
            event: event.id,
            travel: null,
          },
        },
        refetchQueries: ['eventByUUID'],
      });
    } catch (error) {
      console.error(error);
      addToast(t('travel.errors.cant_remove_passenger'));
    }
  };

  const updateTravel = async (travelUpdate: TravelInput) => {
    try {
      await updateTravelMutation({
        variables: {
          id: travel.id,
          travelUpdate,
        },
        refetchQueries: ['eventByUUID'],
      });
    } catch (error) {
      console.error(error);
      addToast(t('travel.errors.cant_update'));
    }
  };

  const removeTravel = async () => {
    try {
      await deleteTravelMutation({
        variables: {
          id: travel.id,
        },
        refetchQueries: [
          {query: EventByUuidDocument, variables: {uuid: event.uuid}},
        ],
      });
      addToast(t('travel.actions.removed'));
    } catch (error) {
      console.error(error);
      addToast(t('travel.errors.cant_remove'));
    }
  };

  return {sendPassengerToWaitingList, updateTravel, removeTravel};
};

export default useActions;
