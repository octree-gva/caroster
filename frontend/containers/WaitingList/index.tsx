import {useReducer, useState, useMemo, useCallback} from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import {Trans, useTranslation} from 'react-i18next';
import useToastStore from '../../stores/useToastStore';
import useEventStore from '../../stores/useEventStore';
import usePassengersActions from '../../hooks/usePassengersActions';
import PassengersList from '../PassengersList';
import RemoveDialog from '../RemoveDialog';
import AddPassengerButtons from '../AddPassengerButtons';
import ClearButton from '../ClearButton';
import AssignButton from './AssignButton';
import TravelDialog from './TravelDialog';
import Button from '@material-ui/core/Button';
import router from 'next/dist/client/router';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

interface Props {
  getToggleNewPassengerDialogFunction: (addSelf: boolean) => () => void;
  canAddSelf: boolean;
}

const WaitingList = ({
  getToggleNewPassengerDialogFunction,
  canAddSelf,
}: Props) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const clearToast = useToastStore(s => s.clearToast);
  const event = useEventStore(s => s.event);
  const addToast = useToastStore(s => s.addToast);
  const [isEditing, toggleEditing] = useReducer(i => !i, false);
  const [removingPassenger, setRemovingPassenger] = useState(null);
  const [addingPassenger, setAddingPassenger] = useState(null);
  const travels =
    event?.travels?.length > 0 ? event?.travels.slice().sort(sortTravels) : [];
  const {updatePassenger, removePassenger} = usePassengersActions();

  const availability = useMemo(() => {
    if (!travels) return;
    return travels.reduce((count, {vehicle, passengers = []}) => {
      if (!vehicle) return 0;
      else if (!passengers) return count + vehicle.seats;
      return count + vehicle.seats - passengers.length;
    }, 0);
  }, [travels]);

  const removePassengerCallback = useCallback(removePassenger, [event]);

  const selectTravel = useCallback(
    async travel => {
      try {
        await updatePassenger(addingPassenger.id, {
          event: null,
          travel: travel.id,
        });
        setAddingPassenger(null);
        addToast(
          t('passenger.success.added_to_car', {
            name: addingPassenger.name,
          }),
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => {
              router.push(`/e/${event.uuid}`);
              clearToast();
            }}
          >
            {t('passenger.success.goToTravels')}
          </Button>
        );
      } catch (error) {
        console.error(error);
        addToast(t('passenger.errors.cant_select_travel'));
      }
    },
    [event, addingPassenger] // eslint-disable-line
  );

  const onPress = useCallback(
    (passengerId: string) => {
      const selectedPassenger = event?.waitingPassengers.find(
        item => item.id === passengerId
      );
      if (isEditing) setRemovingPassenger(selectedPassenger);
      else setAddingPassenger(selectedPassenger);
    },
    [isEditing, event]
  );

  const onRemove = async () => {
    try {
      await removePassengerCallback(removingPassenger.id);
    } catch (error) {
      console.error(error);
      addToast(t('passenger.errors.cant_remove_passenger'));
    }
  };

  const ListButton = isEditing
    ? ({onClick}: {onClick: () => void}) => (
        <ClearButton icon="close" onClick={onClick} tabIndex={-1} />
      )
    : ({onClick, disabled}: {onClick: () => void; disabled: boolean}) => (
        <AssignButton onClick={onClick} tabIndex={-1} disabled={disabled} />
      );

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm" className={classes.card}>
        <Paper>
          <div className={classes.header}>
            <IconButton
              size="small"
              color="primary"
              className={classes.editBtn}
              disabled={!event?.waitingPassengers?.length}
              onClick={toggleEditing}
            >
              {isEditing ? <Icon>check</Icon> : <Icon>edit</Icon>}
            </IconButton>
            <Typography variant="h5">{t('passenger.title')}</Typography>
            <Typography variant="overline">
              {t('passenger.availability.seats', {count: availability})}
            </Typography>
          </div>
          <Divider />
          <AddPassengerButtons
            getOnClickFunction={getToggleNewPassengerDialogFunction}
            canAddSelf={canAddSelf}
            variant="waitingList"
          />
          <Divider />
          <PassengersList
            passengers={event?.waitingPassengers}
            onPress={onPress}
            Button={ListButton}
          />
        </Paper>
      </Container>
      <RemoveDialog
        text={
          <Trans
            i18nKey="passenger.actions.remove_alert"
            values={{
              name: removingPassenger?.name,
            }}
            components={{italic: <i />, bold: <strong />}}
          />
        }
        open={!!removingPassenger}
        onClose={() => setRemovingPassenger(null)}
        onRemove={onRemove}
      />
      <TravelDialog
        eventName={event?.name}
        travels={travels}
        passenger={addingPassenger}
        open={!!addingPassenger}
        onClose={() => setAddingPassenger(null)}
        onSelect={selectTravel}
      />
    </Box>
  );
};

const sortTravels = (a, b) => {
  const dateA = new Date(a.departure).getTime();
  const dateB = new Date(b.departure).getTime();
  if (dateA === dateB)
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  else return dateA - dateB;
};

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    paddingLeft: '80px',

    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  card: {
    marginTop: theme.spacing(6),
  },
  header: {
    position: 'relative',
    padding: theme.spacing(2),
  },
  editBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: theme.spacing(1),
    zIndex: theme.zIndex.speedDial,
  },
}));

export default WaitingList;
