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
}

interface AddPassengerToWaitingList {
  passenger: ComponentPassengerPassenger;
  event: Event;
}

interface RemovePassengerArgs {
  passenger: ComponentPassengerPassenger;
  event: Event;
}

const usepassengersActions = () => {
  const [updateEvent] = useUpdateEventMutation();
  const [updateTravel] = useUpdateTravelMutation();

  const addPassengerToTravel = async ({
    passenger,
    travel,
  }: AddPassengerToTravelArgs) => {
    const passengers =
      [...travel.passengers, passenger].map(({__typename, user, ...item}) => {
        return user && typeof user !== 'string'
          ? {
              ...item,
              user: user.id,
            }
          : item;
      }) || [];

    return updateTravel({
      variables: {
        id: travel.id,
        travelUpdate: {
          passengers,
        },
      },
    });
  };

  const addPassengerToWaitingList = async ({
    passenger,
    event,
  }: AddPassengerToWaitingList) => {
    const waitingList = [
      ...event.waitingList,
      passenger,
    ].map(({__typename, user, ...item}) =>
      user ? {...item, user: user.id} : item
    );
    return updateEvent({
      variables: {uuid: event.uuid, eventUpdate: {waitingList}},
      refetchQueries: ['eventByUUID'],
    });
  };

  const removePassengerFromWaitingList = async ({
    passenger,
    event,
  }: RemovePassengerArgs) => {
    const waitingList = event.waitingList
      .filter(waitingListPassenger => waitingListPassenger.id !== passenger?.id)
      .map(({__typename, user, ...item}) => item);
    return updateEvent({
      variables: {uuid: event.uuid, eventUpdate: {waitingList}},
      refetchQueries: ['eventByUUID'],
    });
  };

  return {
    addPassengerToTravel,
    addPassengerToWaitingList,
    removePassengerFromWaitingList,
  };
};

export default usepassengersActions;
