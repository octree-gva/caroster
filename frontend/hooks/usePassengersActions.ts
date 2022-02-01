import {
  Travel,
  Event,
  useUpdateTravelMutation,
  useUpdateEventMutation,
  ComponentPassengerPassenger,
  ComponentPassengerPassengerInput,
} from '../generated/graphql';

interface AddPassengerToTravelArgs {
  passenger: ComponentPassengerPassengerInput;
  travel: Travel;
  onSucceed?: () => void;
  onError?: (error: string) => void;
}

interface AddPassengerToWaitingList {
  passenger: ComponentPassengerPassenger;
  event: Event;
  onSucceed?: () => void;
  onError?: (error: string) => void;
}

interface RemovePassengerArgs {
  passenger: ComponentPassengerPassenger;
  event: Event;
  onSucceed?: () => void;
  onError?: (error: string) => void;
}

const usepassengersActions = () => {
  const [updateEvent] = useUpdateEventMutation();
  const [updateTravel] = useUpdateTravelMutation();

  const addPassengerToTravel = async ({
    passenger,
    travel,
    onSucceed,
    onError,
  }: AddPassengerToTravelArgs): Promise<void> => {
    try {
      const passengers =
        [...travel.passengers, passenger].map(({__typename, user, ...item}) => {
          return user && typeof user !== 'string'
            ? {
                ...item,
                user: user.id,
              }
            : item;
        }) || [];

      await updateTravel({
        variables: {
          id: travel.id,
          travelUpdate: {
            passengers,
          },
        },
      });
      return onSucceed && onSucceed();
    } catch (error) {
      console.error(error);
      return onError && onError(error);
    }
  };

  const addPassengerToWaitingList = async ({
    passenger,
    event,
    onSucceed,
    onError,
  }: AddPassengerToWaitingList): Promise<void> => {
    try {
      const waitingList = [...event.waitingList, passenger].map(
        ({__typename, user, ...item}) =>
          user ? {...item, user: user.id} : item
      );
      await updateEvent({
        variables: {uuid: event.uuid, eventUpdate: {waitingList}},
        refetchQueries: ['eventByUUID'],
      });
      return onSucceed && onSucceed();
    } catch (error) {
      console.error(error);
      return onError && onError(error);
    }
  };

  const removePassengerFromWaitingList = async ({
    passenger,
    event,
    onSucceed,
    onError,
  }: RemovePassengerArgs): Promise<void> => {
    try {
      const waitingList = event.waitingList
        .filter(
          waitingListPassenger => waitingListPassenger.id !== passenger?.id
        )
        .map(({__typename, user, ...item}) => item);
      await updateEvent({
        variables: {uuid: event.uuid, eventUpdate: {waitingList}},
        refetchQueries: ['eventByUUID'],
      });
      return onSucceed && onSucceed();
    } catch (error) {
      console.error(error);
      return onError && onError(error);
    }
  };

  return {
    addPassengerToTravel,
    addPassengerToWaitingList,
    removePassengerFromWaitingList,
  };
};

export default usepassengersActions;
