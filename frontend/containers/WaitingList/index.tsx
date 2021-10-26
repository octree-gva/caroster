import {useReducer, useState, useMemo, useCallback} from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import {Trans, useTranslation} from 'react-i18next';
import useAddToEvents from '../../hooks/useAddToEvents';
import PassengersList from '../PassengersList';
import RemoveDialog from '../RemoveDialog';
import CarDialog from './CarDialog';
import useToastStore from '../../stores/useToastStore';
import useEventStore from '../../stores/useEventStore';
import {
  useUpdateEventMutation,
  useUpdateCarMutation,
} from '../../generated/graphql';

const WaitingList = () => {
  const classes = useStyles();
  const {t} = useTranslation();
  const event = useEventStore(s => s.event);
  const addToast = useToastStore(s => s.addToast);
  const {addToEvent} = useAddToEvents();
  const [isEditing, toggleEditing] = useReducer(i => !i, false);
  const [removingPassenger, setRemovingPassenger] = useState(null);
  const [addingPassenger, setAddingPassenger] = useState(null);
  const cars = event?.cars?.length > 0 ? event.cars.slice().sort(sortCars) : [];
  const [updateEvent] = useUpdateEventMutation();
  const [updateCar] = useUpdateCarMutation();

  const availability = useMemo(() => {
    if (!cars) return;
    return cars.reduce((count, {seats, passengers = []}) => {
      if (!passengers) return count + seats;
      return count + seats - passengers.length;
    }, 0);
  }, [cars]);

  const addPassenger = useCallback(
    async passenger => {
      try {
        const waitingList = [...event.waitingList, passenger].map(
          ({__typename, ...item}) => item
        );
        await updateEvent({
          variables: {uuid: event.uuid, eventUpdate: {waitingList}},
        });
        addToEvent(event.id);
      } catch (error) {
        console.error(error);
        addToast(t('passenger.errors.cant_add_passenger'));
      }
    },
    [event]
  );

  const removePassenger = useCallback(
    async passengerIndex => {
      try {
        const waitingList = event.waitingList
          .filter((_, idx) => idx !== passengerIndex)
          .map(({__typename, ...item}) => item);
        await updateEvent({
          variables: {uuid: event.uuid, eventUpdate: {waitingList}},
        });
        addToEvent(event.id);
      } catch (error) {
        console.error(error);
        addToast(t('passenger.errors.cant_remove_passenger'));
      }
    },
    [event]
  );

  const selectCar = useCallback(
    async car => {
      try {
        const {id, ...passenger} = addingPassenger;
        const carPassengers = [...(car.passengers || []), passenger].map(
          ({__typename, ...item}) => item
        );
        await updateCar({
          variables: {
            id: car.id,
            carUpdate: {
              passengers: carPassengers,
            },
          },
        });
        const waitingList = event.waitingList
          .filter(item => item.id !== id)
          .map(({__typename, ...item}) => item);
        await updateEvent({
          variables: {
            uuid: event.uuid,
            eventUpdate: {
              waitingList,
            },
          },
        });
      } catch (error) {
        console.error(error);
        addToast(t('passenger.errors.cant_select_car'));
      }
      setAddingPassenger(null);
    },
    [event, addingPassenger] // eslint-disable-line
  );

  const onPress = useCallback(
    (passengerId: string) => {
      const selectedPassenger = event.waitingList.find(
        item => item.id === passengerId
      );
      if (isEditing) setRemovingPassenger(selectedPassenger);
      else setAddingPassenger(selectedPassenger);
    },
    [isEditing, event]
  );

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.header}>
          <IconButton
            size="small"
            color="primary"
            className={classes.editBtn}
            disabled={!event.waitingList?.length}
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
        <PassengersList
          passengers={event.waitingList}
          addPassenger={addPassenger}
          onPress={onPress}
          icon={isEditing ? 'close' : 'chevron_right'}
          disabled={!isEditing && availability <= 0}
        />
      </Paper>
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
        onRemove={() => removePassenger(removingPassenger)}
      />
      <CarDialog
        cars={cars}
        open={!!addingPassenger}
        onClose={() => setAddingPassenger(null)}
        onSelect={selectCar}
      />
    </>
  );
};

const sortCars = (a, b) => {
  const dateA = new Date(a.departure).getTime();
  const dateB = new Date(b.departure).getTime();
  if (dateA === dateB) return new Date(a.createdAt) - new Date(b.createdAt);
  else return dateA - dateB;
};

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  header: {
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
