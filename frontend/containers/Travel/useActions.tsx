import Link from 'next/link';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import useEventStore from '../../stores/useEventStore';
import useToastStore from '../../stores/useToastStore';
import {
  useUpdateTravelMutation,
  useDeleteTravelMutation,
  EventByUuidDocument,
  Travel,
  useUpdatePassengerMutation,
  TravelInput,
} from '../../generated/graphql';
import {getAdressCoordinates} from '../../lib/geo';

interface Props {
  travel: Travel & {id: string};
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

  const eventCoordinates =
    event?.latitude &&
    event?.longitude &&
    `${event.longitude},${event.latitude}`;

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
        t('travel.moved_to_waiting_list'),
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
    const coordinates =
      travelUpdate?.meeting &&
      (await getAdressCoordinates(travelUpdate.meeting, eventCoordinates));
    try {
      await updateTravelMutation({
        variables: {
          id: travel.id,
          travelUpdate: {
            ...travelUpdate,
            meeting_latitude: coordinates?.latitude,
            meeting_longitude: coordinates?.longitude,
          },
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
