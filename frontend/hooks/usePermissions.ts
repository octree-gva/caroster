import useEventStore from '../stores/useEventStore';
import useProfile from './useProfile';

interface UserPermissions {
  canEditEventOptions: boolean;
  canEditEventDetails: boolean;
  canEditWaitingList: boolean;
  canAddTravel: boolean;
  editableTravels: Array<string>;
  canJoinTravels: boolean;
  canAddToTravel: boolean;
}

const noPermissions = {
  canEditEventOptions: false,
  canEditEventDetails: false,
  canEditWaitingList: false,
  canAddTravel: false,
  editableTravels: [],
  canJoinTravels: false,
  canAddToTravel: false,
};

const usePermissions = (): {userPermissions: UserPermissions} => {
  const {event} = useEventStore();
  const {profile, connected, userId} = useProfile();

  const carosterPlus = event?.enabled_modules?.includes('caroster-plus');

  const userIsAnonymous = !connected;
  const userIsEventCreator = event && profile?.email === event.email;

  const travels = event?.travels?.data || [];

  const allPermissions: UserPermissions = {
    canEditEventOptions: true,
    canEditEventDetails: true,
    canEditWaitingList: true,
    canAddTravel: true,
    editableTravels: travels.map(({id}) => id),
    canJoinTravels: true,
    canAddToTravel: true,
  };

  if (carosterPlus) {
    if (userIsAnonymous) return {userPermissions: noPermissions};
    if (userIsEventCreator)
      return {userPermissions: {...allPermissions, canAddToTravel: false}};

    const editableTravelsCollection = travels.filter(({attributes}) => {
      const isDriver = attributes.user?.data?.id === userId;
      return !isDriver;
    });

    const carosterPlusPermissions: UserPermissions = {
      ...noPermissions,
      editableTravels: editableTravelsCollection.map(({id}) => id),
      canJoinTravels: true,
    };

    return {userPermissions: carosterPlusPermissions};
  }

  // Caroster Vanilla permissions
  return {
    userPermissions: {
      ...allPermissions,
      canEditEventOptions: userIsEventCreator,
      canJoinTravels: connected,
    },
  };
};

export default usePermissions;
