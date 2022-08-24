import {
  PassengerInput,
  useCreatePassengerMutation,
  useDeletePassengerMutation,
  useUpdatePassengerMutation,
} from '../generated/graphql';

const usePassengersActions = () => {
  const [createPassenger] = useCreatePassengerMutation();
  const [setPassenger] = useUpdatePassengerMutation();
  const [deletePassenger] = useDeletePassengerMutation();

  const addPassenger = async (passenger: PassengerInput) =>
    createPassenger({
      variables: {
        passenger,
      },
      refetchQueries: ['eventByUUID'],
    });

  const updatePassenger = async (
    passengerId: string,
    passenger: PassengerInput
  ) =>
    setPassenger({
      variables: {id: passengerId, passengerUpdate: passenger},
      refetchQueries: ['eventByUUID'],
    });

  const removePassenger = async (passengerId: string) => {
    return deletePassenger({
      variables: {
        id: passengerId,
      },
      refetchQueries: ['eventByUUID'],
    });
  };

  return {
    addPassenger,
    updatePassenger,
    removePassenger,
  };
};

export default usePassengersActions;
