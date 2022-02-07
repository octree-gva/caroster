import moment from 'moment';
import {useTranslation} from 'react-i18next';
import useEventStore from '../../stores/useEventStore';
import useToastStore from '../../stores/useToastStore';
import {
  useUpdateTravelMutation,
  useUpdateEventMutation,
  useUpdateVehicleMutation,
  useDeleteTravelMutation,
  EventByUuidDocument,
  Travel,
} from '../../generated/graphql';

interface Props {
  travel: Travel;
}

const useActions = (props: Props) => {
  const {travel} = props;
  const {t} = useTranslation();
  const event = useEventStore(s => s.event);
  const addToast = useToastStore(s => s.addToast);
  const [updateEventMutation] = useUpdateEventMutation();
  const [updateTravelMutation] = useUpdateTravelMutation();
  const [updateVehicleMutation] = useUpdateVehicleMutation();
  const [deleteTravelMutation] = useDeleteTravelMutation();

  const sendPassengerToWaitingList = async (passengerId: string) => {
    if (travel?.passengers) {
      try {
        const {id, ...removedPassenger} = travel.passengers?.find(
          item => item.id === passengerId
        );
        if (!removedPassenger) {
          throw 'No corresponding passenger';
        }
        const existingPassengers =
          travel.passengers?.map(({__typename, user, ...item}) =>
            user && user.id ? {...item, user: user.id} : item
          ) || [];
        const waitingList = [
          ...event.waitingList,
          removedPassenger,
        ].map(({__typename, user, ...item}) =>
          user && user.id ? {...item, user: user.id} : item
        );
        const passengers = existingPassengers.filter(
          item => item.id !== passengerId
        );
        await updateEventMutation({
          variables: {
            uuid: event.uuid,
            eventUpdate: {
              waitingList,
            },
          },
        });
        await updateTravelMutation({
          variables: {
            id: travel.id,
            travelUpdate: {
              passengers,
            },
          },
          refetchQueries: ['eventByUUID'],
        });
      } catch (error) {
        console.error(error);
        addToast(t('travel.errors.cant_remove_passenger'));
      }
    }
  };

  const updateTravel = async update => {
    try {
      // If new seats count is under current passengers count, put excedent in event waiting list
      // TODO: Move these logics to backend
      if (travel.passengers?.length > update.vehicle?.seats) {
        const lostPassengers = travel.passengers.slice(update.vehicle?.seats);
        if (lostPassengers.length > 0)
          await updateEventMutation({
            variables: {
              uuid: event.uuid,
              eventUpdate: {
                waitingList: formatPassengers([
                  ...(event.waitingList || []),
                  ...lostPassengers.map(({name}) => ({name})),
                ]),
              },
            },
            refetchQueries: ['eventByUUID'],
          });
      }
      const departure = moment(
        `${moment(update.travel.date).format('YYYY-MM-DD')} ${moment(
          update.travel.time
        ).format('HH:mm')}`,
        'YYYY-MM-DD HH:mm'
      ).toISOString();
      await updateTravelMutation({
        variables: {
          id: travel.id,
          travelUpdate: {
            departure,
            meeting: update.travel.meeting,
            details: update.travel.details,
            passengers: formatPassengers(
              travel.passengers,
              travel.vehicle?.seats
            ),
          },
        },
      });
      await updateVehicleMutation({
        variables: {
          id: travel?.vehicle?.id,
          vehicleUpdate: update.vehicle,
        },
      });
    } catch (error) {
      console.error(error);
      addToast(t('travel.errors.cant_update'));
    }
    return false;
  };

  const removeTravel = async () => {
    try {
      // Put passengers in event waiting list (if any)
      // TODO Move these logics to backend and delete vehicle if no user linked
      if (Array.isArray(travel?.passengers) && travel.passengers.length > 0)
        await updateEventMutation({
          variables: {
            uuid: event.uuid,
            eventUpdate: {
              waitingList: formatPassengers([
                ...(event.waitingList || []),
                ...travel.passengers.map(({name}) => ({name})),
              ]),
            },
          },
          refetchQueries: [
            {query: EventByUuidDocument, variables: {uuid: event.uuid}},
          ],
        });
      await deleteTravelMutation({
        variables: {
          id: travel.id,
        },
      });
      addToast(t('travel.actions.removed'));
    } catch (error) {
      console.error(error);
      addToast(t('travel.errors.cant_remove'));
    }
  };

  return {sendPassengerToWaitingList, updateTravel, removeTravel};
};

const formatPassengers = (passengers = [], seats: number = 1000) => {
  if (!passengers) return [];
  return passengers
    .slice(0, seats)
    .map(({__typename, ...passenger}) => passenger);
};

export default useActions;
