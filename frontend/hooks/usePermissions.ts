import {PassengerEntity, TravelEntity} from '../generated/graphql';
import useEventStore from '../stores/useEventStore';
import useProfile from './useProfile';

interface UserPermissions {
  canEditEventOptions: () => boolean;
  canEditEventDetails: () => boolean;
  canEditWaitingList: () => boolean;
  canSeeAdminWaitingList: () => boolean;
  canSetAlert: () => boolean;
  canEditTravel: (travel: TravelEntity) => boolean;
  canSeeTravelDetails: (travel: TravelEntity) => boolean;
  canDeletePassenger: (passenger: PassengerEntity) => boolean;
  canSeePassengerDetails: (passenger: PassengerEntity) => boolean;
  canSeeFullName: () => boolean;
}

const noPermissions = {
  canEditEventOptions: () => false,
  canEditEventDetails: () => false,
  canEditWaitingList: () => false,
  canSeeAdminWaitingList: () => false,
  canSetAlert: () => false,
  canEditTravel: () => false,
  canSeeTravelDetails: () => false,
  canDeletePassenger: () => false,
  canSeePassengerDetails: () => false,
  canSeeFullName: () => false,
};

const usePermissions = (): {userPermissions: UserPermissions} => {
  const {event} = useEventStore();
  const {profile, connected, userId} = useProfile();

  const carosterPlus = event?.enabled_modules?.includes('caroster-plus');
  const userIsAnonymous = !connected;
  const userIsEventCreator = event && profile?.email === event.email;
  const userIsEventAdmin =
    userIsEventCreator || event?.administrators?.includes(profile?.email);

  const allPermissions: UserPermissions = {
    canEditEventOptions: () => true,
    canEditEventDetails: () => true,
    canEditWaitingList: () => true,
    canSeeAdminWaitingList: () => true,
    canSetAlert: () => true,
    canSeeTravelDetails: () => true,
    canEditTravel: () => true,
    canDeletePassenger: () => true,
    canSeePassengerDetails: () => true,
    canSeeFullName: () => userIsEventAdmin,
  };

  if (carosterPlus) {
    if (userIsAnonymous) return {userPermissions: noPermissions};
    else if (userIsEventAdmin)
      return {
        userPermissions: allPermissions,
      };
    else {
      const carosterPlusPermissions: UserPermissions = {
        ...noPermissions,
        canEditTravel: travel => {
          const travelCreatorId =
            travel.attributes.user?.data?.id || travel.attributes.user;
          return travelCreatorId === userId;
        },

        canSeeTravelDetails: travel => {
          const travelCreatorId =
            travel.attributes.user?.data?.id || travel.attributes.user;
          if (travelCreatorId === userId) return true;
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
        canSeeTravelDetails: () => true,
      },
    };
};

export default usePermissions;
