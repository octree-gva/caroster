import Link from 'next/link';
import Button from '@mui/material/Button';
import {useTranslation} from 'next-i18next';
import useEventStore from '../../stores/useEventStore';
import useToastStore from '../../stores/useToastStore';
import {
  useUpdateTravelMutation,
  useDeleteTravelMutation,
  EventByUuidDocument,
  useUpdatePassengerMutation,
  TravelInput,
  TravelEntity,
  useDeletePassengerMutation,
} from '../../generated/graphql';

interface Props {
  travel: TravelEntity;
}

const useActions = (props: Props) => {
  const {travel} = props;
  const {t} = useTranslation();
  const event = useEventStore(s => s.event);
  const addToast = useToastStore(s => s.addToast);
  const clearToast = useToastStore(s => s.clearToast);
  const [updateTravelMutation] = useUpdateTravelMutation();
  const [deleteTravelMutation] = useDeleteTravelMutation();
  const [updatePassenger] = useUpdatePassengerMutation();
  const [deletePassenger] = useDeletePassengerMutation();

  const removePassengerFromTravel = async (passengerId: string) => {
    const isCarosterPlus = event.enabled_modules?.includes('caroster-plus');
    if (isCarosterPlus) {
      try {
        await deletePassenger({
          variables: {
            id: passengerId,
          },
          refetchQueries: ['eventByUUID'],
        });
        addToast(t`travel.passengers.removed`);
      } catch (error) {
        console.error(error);
        addToast(t('travel.errors.cant_remove_passenger'));
      }
    } else return sendPassengerToWaitingList(passengerId);
  };

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
      addToast(
        t('travel.passengers.moved_to_waiting_list'),
        <Link href={`/e/${event.uuid}/waitingList`} passHref>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => clearToast()}
          >
            {t('generic.access')}
          </Button>
        </Link>
      );
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
          travelUpdate: {
            ...travelUpdate,
          },
        },
        refetchQueries: [
          {
            query: EventByUuidDocument,
            variables: {
              uuid: event.uuid,
            },
          },
        ],
      });
    } catch (error) {
      console.error(error);
      addToast(t('travel.errors.cant_update'));
    }
  };

  const removeTravel = async (successText?: string) => {
    try {
      await deleteTravelMutation({
        variables: {
          id: travel.id,
        },
        refetchQueries: [
          {query: EventByUuidDocument, variables: {uuid: event.uuid}},
        ],
      });
      addToast(successText || t('travel.actions.removed'));
    } catch (error) {
      console.error(error);
      addToast(t('travel.errors.cant_remove'));
    }
  };

  return {removePassengerFromTravel, updateTravel, removeTravel};
};

export default useActions;
