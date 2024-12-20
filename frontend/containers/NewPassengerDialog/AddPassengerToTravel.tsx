import {FormEvent, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mui/material/Icon';
import {useTranslation} from 'next-i18next';
import useAddToEvents from '../../hooks/useAddToEvents';
import useEventStore from '../../stores/useEventStore';
import {TravelEntity} from '../../generated/graphql';
import SubmitButton from './SubmitButton';
import Transition from './Transition';
import AddPassengerCommonFields from './AddPassengerCommonFields';
import useStyles from './useStyles';
import useToastStore from '../../stores/useToastStore';
import usePassengersActions from '../../hooks/usePassengersActions';
import {validateEmail} from '../../lib/validation';
import usePermissions from '../../hooks/usePermissions';
import {getTravelName} from '../../lib/travels';

interface Props {
  travel: TravelEntity;
  toggle: () => void;
  open: boolean;
}

const AddPassengerToTravel = ({open, toggle, travel}: Props) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const event = useEventStore(s => s.event);
  const {addToEvent} = useAddToEvents();
  const addToast = useToastStore(s => s.addToast);
  const {
    userPermissions: {canSeeFullName},
  } = usePermissions();

  // States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const emailValidated = validateEmail(email);
  const canAddPassenger = !!name;
  const {addPassenger} = usePassengersActions();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const passenger = {
      email: email || null,
      name,
    };

    try {
      await addPassenger({...passenger, travel: travel.id, event: event.id});
      addToEvent(event.id);
      addToast(t('passenger.success.added_to_car', {name}));
      toggle();
    } catch (error) {
      console.error(error);
      if (error.message === 'no_enough_seats')
        addToast(t`passenger.errors.car_full`);
    }
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
          {getTravelName(travel, canSeeFullName())}
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
            emailError={!emailValidated}
            setEmail={setEmail}
            optionalEmail
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

export default AddPassengerToTravel;
