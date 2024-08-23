import {PassengerEntity, TravelEntity} from '../generated/graphql';
import useEventStore from '../stores/useEventStore';
import useProfile from './useProfile';

interface UserPermissions {
  canEditEventOptions: () => boolean;
  canEditEventDetails: () => boolean;
  canEditWaitingList: () => boolean;
  canSetAlert: () => boolean;
  canAddTravel: () => boolean;
  canEditTravel: (travel: TravelEntity) => boolean;
  canSeeTravelDetails: (travel: TravelEntity) => boolean;
  canJoinTravels: () => boolean;
  canAddToTravel: () => boolean;
  canDeletePassenger: (passenger: PassengerEntity) => boolean;
  canSeePassengerDetails: (passenger: PassengerEntity) => boolean;
}

const noPermissions = {
  canEditEventOptions: () => false,
  canEditEventDetails: () => false,
  canEditWaitingList: () => false,
  canSetAlert: () => false,
  canAddTravel: () => false,
  canEditTravel: () => false,
  canSeeTravelDetails: () => false,
  canJoinTravels: () => false,
  canAddToTravel: () => false,
  canDeletePassenger: () => false,
  canSeePassengerDetails: () => false,
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
    canSetAlert: () => true,
    canAddTravel: () => true,
    canSeeTravelDetails: () => true,
    canEditTravel: () => true,
    canJoinTravels: () => true,
    canAddToTravel: () => true,
    canDeletePassenger: () => true,
    canSeePassengerDetails: () => true,
  };

  if (carosterPlus) {
    if (userIsAnonymous) return {userPermissions: noPermissions};
    else if (userIsEventCreator || userIsEventAdmin)
      return {
        userPermissions: {...allPermissions, canAddToTravel: () => false},
      };
    else {
      const carosterPlusPermissions: UserPermissions = {
        ...noPermissions,
        canEditTravel: travel => {
          const travelCreatorId =
            travel.attributes.user?.data?.id || travel.attributes.user;
          return travelCreatorId === userId;
        },

        canJoinTravels: () => true,
        canAddTravel: () => true,
        canSeeTravelDetails: travel => {
          const isInPassengersList = travel.attributes.passengers.data?.some(
            passenger => passenger.attributes.user?.data?.id === userId
          );
          return isInPassengersList;
        },
        canSetAlert: () => true,
        canDeletePassenger: passenger => {
          const travel = event?.travels?.data?.find(travel =>
            travel.attributes.passengers.data.some(
              travelPassenger => travelPassenger.id === passenger.id
            )
          );
          const isTravelCreator = travel?.attributes.user?.data?.id === userId;
          const isCurrentPassenger =
            passenger.attributes.user?.data?.id === userId;
          return isTravelCreator || isCurrentPassenger;
        },
        canSeePassengerDetails: passenger => {
          const travel = event?.travels?.data?.find(
            travel => travel?.id === passenger.attributes.travel.data?.id
          );
          const userIsDriver = travel?.attributes.user?.data?.id === userId;
          return userIsDriver || passenger.attributes.user?.data?.id === userId;
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
        canSeePassengerDetails: () => false,
        canDeletePassenger: () => true,
        canEditEventOptions: () => userIsEventCreator,
        canSetAlert: () => false,
        canJoinTravels: () => connected,
        canSeeTravelDetails: () => true,
      },
    };
};

export default usePermissions;
