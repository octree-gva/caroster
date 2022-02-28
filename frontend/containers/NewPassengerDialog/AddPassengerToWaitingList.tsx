import {FormEvent, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import {useTranslation} from 'react-i18next';
import useToastStore from '../../stores/useToastStore';
import useEventStore from '../../stores/useEventStore';
import useAddToEvents from '../../hooks/useAddToEvents';
import usepassengersActions from '../../hooks/usePassengersActions';
import useProfile from '../../hooks/useProfile';
import SubmitButton from './SubmitButton';
import Transition from './Transition';
import AddPassengerCommonFields from './AddPassengerCommonFields';
import useStyles from './useStyles';
import { validateEmail } from './validation';

interface Props {
  toggle: () => void;
  open: boolean;
  addSelf: boolean;
}

const NewPassengerDialog = ({open, toggle, addSelf}: Props) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const event = useEventStore(s => s.event);
  const addToast = useToastStore(s => s.addToast);
  const {addToEvent} = useAddToEvents();

  // States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const emailValidated = validateEmail(email);
  const [location, setlocation] = useState('');
  const canAddPassenger = !!name && !!email;
  const {user} = useProfile();
  const {addPassengerToWaitingList} = usepassengersActions();

  const addPassenger = async (e: FormEvent) => {
    e.preventDefault();
    const passenger =
      addSelf && user
        ? {
            user: user,
            email: user.email,
            name: user.username,
            location,
          }
        : {
            email,
            name,
            location,
          };
    try {
      await addPassengerToWaitingList({
        passenger,
        event,
      });
      addToEvent(event.id);
      addToast(
        t(
          addSelf
            ? 'passenger.success.added_self_to_waitlist'
            : 'passenger.success.added_to_waitlist',
          {name}
        )
      );
      toggle();
    } catch (error) {
      console.error(error);
      addToast(t('passenger.errors.cant_add_passenger'));
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
      <form onSubmit={addPassenger}>
        <DialogTitle className={classes.title}>
          {t('travel.passengers.register_to_waiting_list')}
          <Icon
            className={classes.closeIcon}
            onClick={toggle}
            aria-label="close"
          >
            close
          </Icon>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {!addSelf && (
            <AddPassengerCommonFields
              email={email}
              emailError={!emailValidated}
              setEmail={setEmail}
              name={name}
              setName={setName}
            />
          )}
          <Box className={classes.inputBox}>
            <label htmlFor="location">
              <Typography className={classes.label}>
                <Icon className={classes.labelIcon}>place</Icon>{' '}
                {t('travel.passengers.location')}
              </Typography>
            </label>
            <TextField
              id="Passengerlocation"
              name="location"
              value={location}
              onChange={e => setlocation(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              label=""
              placeholder={t('travel.passengers.location_placeholder')}
            />
            <Typography variant="caption">
              {t('travel.passengers.location_helper')}
            </Typography>
          </Box>
          <SubmitButton
            disabled={!addSelf && !canAddPassenger}
            important={addSelf}
          >
            {!addSelf && t('travel.passengers.add_someone')}
            {addSelf && t('travel.passengers.add_me')}
          </SubmitButton>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default NewPassengerDialog;
