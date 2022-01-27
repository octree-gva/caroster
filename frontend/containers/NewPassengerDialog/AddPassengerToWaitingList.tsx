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
import SubmitButton from './SubmitButton';
import Transition from './Transition';
import AddPassengerCommonFields from './AddPassengerCommonFields';
import useStyles from './useStyles';
import {useUpdateEventMutation} from '../../generated/graphql';

interface Props {
  toggle: () => void;
  open: boolean;
}

const NewPassengerDialog = ({
  open,
  toggle,
}: Props) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const event = useEventStore(s => s.event);
  const addToast = useToastStore(s => s.addToast);
  const {addToEvent} = useAddToEvents();
  const [updateEvent] = useUpdateEventMutation();

  // States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setlocation] = useState('');
  const canAddPassenger = !!name && !!email;

  const addPassenger = async (e: FormEvent) => {
    e.preventDefault();
    const passenger = {
      email,
      name,
      location,
    };

    try {
      const waitingList = [...event.waitingList, passenger].map(
        ({__typename, ...item}) => item
      );
      await updateEvent({
        variables: {uuid: event.uuid, eventUpdate: {waitingList}},
        refetchQueries: ['eventByUUID'],
      });
      addToEvent(event.id);
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
          <AddPassengerCommonFields
            email={email}
            setEmail={setEmail}
            name={name}
            setName={setName}
          />
          <Box className={classes.inputBox}>
            <label htmlFor="location">
              <Typography>
                <Icon className={classes.labelIcon}>
                  place
                </Icon>{' '}
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
          <SubmitButton disabled={!canAddPassenger}>
            {t('travel.passengers.add_someone')}
          </SubmitButton>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default NewPassengerDialog;
