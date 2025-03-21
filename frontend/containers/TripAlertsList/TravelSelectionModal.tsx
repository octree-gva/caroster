import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  Typography,
} from '@mui/material';
import {useTranslation} from 'next-i18next';
import useEventStore from '../../stores/useEventStore';
import AvailableTravel from '../AssignPassenger/AvailableTravel';
import {TravelEntity} from '../../generated/graphql';

type Props = {
  open: boolean;
  onClose: () => void;
  onAssign: (travel: TravelEntity) => void;
};

const TravelSelectionModal = (props: Props) => {
  const {open, onClose, onAssign} = props;
  const {t} = useTranslation();
  const travels = useEventStore(s => s.event?.travels?.data || []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t`passenger.assign.title`}</DialogTitle>
      <DialogContent sx={{p: 0}}>
        {!travels?.length && (
          <Typography px={3}>{t`passenger.assign.no_travel.title`}</Typography>
        )}
        <List disablePadding>
          {travels?.map(travel => (
            <AvailableTravel
              key={travel.id}
              travel={travel}
              assign={onAssign}
            />
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t`generic.cancel`}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TravelSelectionModal;
