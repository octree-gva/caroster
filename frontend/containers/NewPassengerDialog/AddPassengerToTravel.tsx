import {FormEvent, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import {useTranslation} from 'react-i18next';
import useAddToEvents from '../../hooks/useAddToEvents';
import useEventStore from '../../stores/useEventStore';
import {
  useUpdateTravelMutation,
  Travel as TravelType,
} from '../../generated/graphql';
import SubmitButton from './SubmitButton';
import Transition from './Transition';
import AddPassengerCommonFields from './AddPassengerCommonFields';
import useStyles from './useStyles';

interface Props {
  travel: TravelType;
  toggle: () => void;
  open: boolean;
}

const NewPassengerDialog = ({open, toggle, travel}: Props) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const event = useEventStore(s => s.event);
  const [updateTravel] = useUpdateTravelMutation();
  const {addToEvent} = useAddToEvents();

  // States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const canAddPassenger = !!name && !!email;

  const addPassenger = async (e: FormEvent) => {
    e.preventDefault();
    const passenger = {
      email,
      name,
    };

    try {
      const existingPassengers =
        travel.passengers?.map(({__typename, ...item}) => item) || [];
      const passengers = [...existingPassengers, passenger];
      await updateTravel({
        variables: {
          id: travel.id,
          travelUpdate: {
            passengers,
          },
        },
      });
      addToEvent(event.id);
      toggle();
    } catch (error) {
      console.error(error);
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
