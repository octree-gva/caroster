import {useTranslation} from 'next-i18next';
import {PureQueryOptions} from '@apollo/client/core';
import useToastsStore from '../../stores/useToastStore';
import useAddToEvents from '../../hooks/useAddToEvents';
import {
  EventByUuidDocument,
  useCreateTravelMutation,
  TravelInput,
  Event,
} from '../../generated/graphql';

interface Props {
  event: Event & {id: string};
}

const useActions = (props: Props) => {
  const {event} = props;
  const {t} = useTranslation();
  const addToast = useToastsStore(s => s.addToast);
  const {addToEvent} = useAddToEvents();
  const [createTravelMutation] = useCreateTravelMutation();

  const createTravel = async (travelInput: TravelInput) => {
    const refetchQueries: Array<PureQueryOptions> = [
      {
        query: EventByUuidDocument,
        variables: {
          uuid: event.uuid,
        },
      },
    ];

    try {
      await createTravelMutation({
        variables: {
          travel: travelInput,
        },
        refetchQueries,
      });
      addToEvent(event.id);
      addToast(t('travel.creation.created'));
    } catch (error) {
      console.error(error);
      addToast(t('travel.errors.cant_create'));
    }
  };

  return {createTravel};
};

export default useActions;
