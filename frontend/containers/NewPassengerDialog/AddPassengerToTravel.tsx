import {FormEvent, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import {useTranslation} from 'react-i18next';
import useAddToEvents from '../../hooks/useAddToEvents';
import useEventStore from '../../stores/useEventStore';
import {
  Travel as TravelType,
} from '../../generated/graphql';
import SubmitButton from './SubmitButton';
import Transition from './Transition';
import AddPassengerCommonFields from './AddPassengerCommonFields';
import useStyles from './useStyles';
import useToastStore from '../../stores/useToastStore';
import usePassengersActions from '../../hooks/usePassengersActions';

interface Props {
  travel: TravelType;
  toggle: () => void;
  open: boolean;
}

const NewPassengerDialog = ({open, toggle, travel}: Props) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const event = useEventStore(s => s.event);
  const {addToEvent} = useAddToEvents();
  const addToast = useToastStore(s => s.addToast);

  // States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const canAddPassenger = !!name && !!email;
  const {addPassengerToTravel} = usePassengersActions();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const passenger = {
      email,
      name,
    };

    return addPassengerToTravel({passenger, travel, onSucceed: () => {
      addToEvent(event.id);
      addToast(t('passenger.success.added_to_car', {name}));
      toggle();
    }});
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={toggle}
      TransitionComponent={Transition}
    >
      <form onSubmit={onSubmit}>
        <DialogTitle className={classes.title}>
          {travel.vehicle.name}
          <Icon
            className={classes.closeIcon}
            onClick={toggle}
            aria-label="close"
          >
            close
          </Icon>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <AddPassengerCommonFields
            email={email}
            setEmail={setEmail}
            name={name}
            setName={setName}
          />
          <SubmitButton disabled={!canAddPassenger}>
            {t('travel.passengers.add_to_car')}
          </SubmitButton>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default NewPassengerDialog;
