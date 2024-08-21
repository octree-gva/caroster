import {useTranslation} from 'next-i18next';
import {
  Typography,
  Dialog,
  Button,
  DialogContent,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import useProfile from '../../hooks/useProfile';
import useEventStore from '../../stores/useEventStore';
import {PassengerEntity} from '../../generated/graphql';

interface Props {
  passenger: PassengerEntity;
  close: () => void;
  removePassenger: (id: string) => void;
}

const RemovePassengerModal = ({passenger, close, removePassenger}: Props) => {
  const {t} = useTranslation();
  const event = useEventStore(s => s.event);
  const isCarosterPlus = event.enabled_modules?.includes('caroster-plus');
  const {userId} = useProfile();
  const IsPassengerIsUser = passenger.attributes?.user?.data?.id === userId;

  const getDescriptionKey = () => {
    if (IsPassengerIsUser && isCarosterPlus) {
      return 'travel.removePassengerModal.plus.self.description';
    } else if (isCarosterPlus) {
      return 'travel.removePassengerModal.plus.description';
    } else if (IsPassengerIsUser) {
      return 'travel.removePassengerModal.self.description';
    } else {
      return 'travel.removePassengerModal.description';
    }
  };

  return (
    <Dialog open={!!passenger} onClose={close}>
      <DialogTitle>
        {t(
          IsPassengerIsUser
            ? 'travel.removePassengerModal.self.title'
            : 'travel.removePassengerModal.title'
        )}
      </DialogTitle>
      <DialogContent>
        <Typography>{t(getDescriptionKey())}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>
          {t('travel.removePassengerModal.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={() => removePassenger(passenger.id)}
        >
          {t(
            IsPassengerIsUser
              ? 'travel.removePassengerModal.self.remove'
              : 'travel.removePassengerModal.remove'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemovePassengerModal;
