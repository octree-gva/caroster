import {useCallback} from 'react';
import {
  SetTripAlertMutationVariables,
  useSetTripAlertMutation,
} from '../../generated/graphql';
import {t} from 'i18next';
import useToastStore from '../../stores/useToastStore';

const useCreateTripAlert = () => {
  const addToast = useToastStore(s => s.addToast);
  const [setTripAlertMutation] = useSetTripAlertMutation();

  const handleCreateTripAlert = useCallback(
    async (variables: SetTripAlertMutationVariables) => {
      try {
        await setTripAlertMutation({
          variables,
        });
        addToast(t('alert.create'));
      } catch (error) {
        addToast(t('alert.errors.cant_create'));
        console.error(error);
      }
    },
    [addToast, setTripAlertMutation]
  );

  return handleCreateTripAlert;
};

export default useCreateTripAlert;
