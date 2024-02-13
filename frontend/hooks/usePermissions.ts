import {PassengerEntity, TravelEntity} from '../generated/graphql';
import useEventStore from '../stores/useEventStore';
import useProfile from './useProfile';

interface UserPermissions {
  canEditEventOptions: () => boolean;
  canEditEventDetails: () => boolean;
  canEditWaitingList: () => boolean;
  canAddTravel: () => boolean;
  canEditTravel: (travel: TravelEntity) => boolean;
  canJoinTravels: () => boolean;
  canAddToTravel: () => boolean;
  canDeletePassenger: (passenger: PassengerEntity) => boolean;
}

const noPermissions = {
  canEditEventOptions: () => false,
  canEditEventDetails: () => false,
  canEditWaitingList: () => false,
  canAddTravel: () => false,
  canEditTravel: () => false,
  canJoinTravels: () => false,
  canAddToTravel: () => false,
  canDeletePassenger: () => false,
};

const usePermissions = (): {userPermissions: UserPermissions} => {
  const {event} = useEventStore();
  const {profile, connected, userId} = useProfile();

  const carosterPlus = event?.enabled_modules?.includes('caroster-plus');
  const userIsAnonymous = !connected;
  const userIsEventCreator = event && profile?.email === event.email;
  const userIsEventAdmin = event?.administrators?.includes(profile?.email);

  const allPermissions: UserPermissions = {
    canEditEventOptions: () => true,
    canEditEventDetails: () => true,
    canEditWaitingList: () => true,
    canAddTravel: () => true,
    canEditTravel: () => true,
    canJoinTravels: () => true,
    canAddToTravel: () => true,
    canDeletePassenger: () => true,
  };

  if (carosterPlus) {
    if (userIsAnonymous) return {userPermissions: noPermissions};
    else if (userIsEventCreator || userIsEventAdmin)
      return {userPermissions: {...allPermissions, canAddToTravel: () => false}};
    else {
      const carosterPlusPermissions: UserPermissions = {
        ...noPermissions,
        canEditTravel: travel => {
          const travelCreatorId = travel.attributes.user?.data?.id || travel.attributes.user;
          return travelCreatorId === userId;
        },
        canJoinTravels: () => true,
        canAddTravel: () => true,
        canDeletePassenger: (passenger) => {
          const travel = event?.travels?.data?.find(travel => travel.id === passenger.attributes.travel.data.id);
          const travelCreatorId = travel?.attributes.user?.data?.id || travel?.attributes.user;
          return travelCreatorId === userId;
        },
      };
      return {userPermissions: carosterPlusPermissions};
    }
  }
  // Caroster Vanilla permissions
  else
    return {
      userPermissions: {
        ...allPermissions,
        canEditEventOptions: () => userIsEventCreator,
        canJoinTravels: () => connected,
      },
    };
};

export default usePermissions;
