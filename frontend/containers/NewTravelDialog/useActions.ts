import moment from 'moment';
import {useTranslation} from 'react-i18next';
import useToastsStore from '../../stores/useToastStore';
import useAddToEvents from '../../hooks/useAddToEvents';
import {
  Event,
  EventByUuidDocument,
  useCreateTravelMutation,
  useCreateVehicleMutation,
} from '../../generated/graphql';

interface Props {
  event: Event;
}

const useActions = (props: Props) => {
  const {event} = props;
  const {t} = useTranslation();
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
      const {data: {createVehicle} = {}} = await createVehicleMutation({
        variables: {
          vehicle,
        },
      });

      await createTravelMutation({
        variables: {
          travel: {
            ...travel,
            departure,
            event: event.id,
            vehicle: createVehicle?.vehicle?.id,
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
