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
  const userIsEventAdmin = event?.administrators?.includes(profile?.email);

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
    else if (userIsEventCreator || userIsEventAdmin)
      return {userPermissions: {...allPermissions, canAddToTravel: false}};

    const editableTravelsCollection = travels.filter(({attributes}) => {
      const userIsDriver = attributes.user?.data?.id === userId;
      return !userIsDriver;
    });

    const carosterPlusPermissions: UserPermissions = {
      ...noPermissions,
      editableTravels: editableTravelsCollection.map(({id}) => id),
      canJoinTravels: true,
      canAddTravel: true,
    };

    return {userPermissions: carosterPlusPermissions};
  }
  // Caroster Vanilla permissions
  else
    return {
      userPermissions: {
        ...allPermissions,
        canEditEventOptions: userIsEventCreator,
        canJoinTravels: connected,
      },
    };
};

export default usePermissions;
