import moment from 'moment';
import {useTranslation} from 'react-i18next';
import useToastsStore from '../../stores/useToastStore';
import useAddToEvents from '../../hooks/useAddToEvents';
import {
  Event,
  EventByUuidDocument,
  useCreateTravelMutation,
  useCreateVehicleMutation,
  FindUserVehiclesDocument,
  Vehicle,
} from '../../generated/graphql';
import useProfile from '../../hooks/useProfile';

interface Props {
  event: Event;
}

const useActions = (props: Props) => {
  const {event} = props;
  const {t} = useTranslation();
  const {user} = useProfile();
  const addToast = useToastsStore(s => s.addToast);
  const {addToEvent} = useAddToEvents();
  const [createVehicleMutation] = useCreateVehicleMutation();
  const [createTravelMutation] = useCreateTravelMutation();

  // TODO Move these logics to backend
  const createTravel = async ({vehicle, date, time, ...travel}) => {
    try {
      const departure = moment(
        `${moment(date).format('YYYY-MM-DD')} ${moment(time).format('HH:mm')}`,
        'YYYY-MM-DD HH:mm'
      ).toISOString();

      const makeTravelMutationParams = (travelVehicle: Vehicle) => ({
        variables: {
          travel: {
            ...travel,
            departure,
            event: event.id,
            vehicle: travelVehicle?.id,
          },
        },
        refetchQueries: [
          {
            query: EventByUuidDocument,
            variables: {
              uuid: event.uuid,
            },
          },
        ],
      });

      if (vehicle.id) {
        // The authenticated user chooses an existing vehicle and assign it to the travel
        await createTravelMutation(makeTravelMutationParams(vehicle));
      } else if (user) {
        // The autenticated user creates a vehicle and assign it to the travel
        const {data: {createVehicle} = {}} = await createVehicleMutation({
          variables: {
            vehicle,
          },
          refetchQueries: [
            {
              query: FindUserVehiclesDocument,
              variables: {userId: user.id},
            },
          ],
        });

        const params = makeTravelMutationParams(
          createVehicle.vehicle as Vehicle
        );
        await createTravelMutation(params);
      } else {
        // The anonymous user creates a vehicle and assign it to the travel
        const {data: {createVehicle} = {}} = await createVehicleMutation({
          variables: {
            vehicle,
          },
        });

        await createTravelMutation(makeTravelMutationParams(createVehicle?.vehicle as Vehicle));
      }

      addToEvent(event.id);
      addToast(t('travel.creation.created'));
    } catch (error) {
      console.error(error);
      addToast(t('travel.errors.cant_create'));
    }
    return false;
  };

  return {createTravel};
};

export default useActions;
