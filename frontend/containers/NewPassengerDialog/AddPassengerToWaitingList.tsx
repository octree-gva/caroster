import {FormEvent, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import {useTranslation} from 'react-i18next';
import useToastStore from '../../stores/useToastStore';
import useEventStore from '../../stores/useEventStore';
import useAddToEvents from '../../hooks/useAddToEvents';
import usePassengersActions from '../../hooks/usePassengersActions';
import useProfile from '../../hooks/useProfile';
import SubmitButton from './SubmitButton';
import Transition from './Transition';
import AddPassengerCommonFields from './AddPassengerCommonFields';
import useStyles from './useStyles';
import {validateEmail} from './validation';
import {PassengerInput} from '../../generated/graphql';

interface Props {
  toggle: () => void;
  open: boolean;
  addSelf: boolean;
}

const AddPassengerToWaitingList = ({open, toggle, addSelf}: Props) => {
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
  const {profile, userId} = useProfile();
  const {addPassenger} = usePassengersActions();

  const onAddPassenger = async (e: FormEvent) => {
    e.preventDefault();
    let passenger: PassengerInput = {
      email,
      name,
      location,
    };
    if (addSelf && profile) {
      const hasName = profile.firstName && profile.lastName;
      const userName = profile.firstName + ' ' + profile.lastName;
      passenger = {
        user: userId,
        email: profile.email,
        name: hasName ? userName : profile.username,
        location,
      };
    }

    try {
      await addPassenger({...passenger, event: event.id});
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
      <form onSubmit={onAddPassenger}>
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

export default AddPassengerToWaitingList;
