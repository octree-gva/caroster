import {FormEvent, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import {useTranslation} from 'react-i18next';
import useAddToEvents from '../../hooks/useAddToEvents';
import useEventStore from '../../stores/useEventStore';
import {Travel as TravelType} from '../../generated/graphql';
import SubmitButton from './SubmitButton';
import Transition from './Transition';
import AddPassengerCommonFields from './AddPassengerCommonFields';
import useStyles from './useStyles';
import useToastStore from '../../stores/useToastStore';
import usePassengersActions from '../../hooks/usePassengersActions';
import {validateEmail} from './validation';

interface Props {
  travel: TravelType & {id: string};
  toggle: () => void;
  open: boolean;
}

const AddPassengerToTravel = ({open, toggle, travel}: Props) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const event = useEventStore(s => s.event);
  const {addToEvent} = useAddToEvents();
  const addToast = useToastStore(s => s.addToast);

  // States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const emailValidated = validateEmail(email);
  const canAddPassenger = !!name;
  const {addPassenger} = usePassengersActions();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const passenger = {
      email,
      name,
    };

    try {
      await addPassenger({...passenger, travel: travel.id});
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
          {travel.vehicleName}
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
