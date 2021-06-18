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

const WaitingList = ({car}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const event = useEventStore(s => s.event);
  const addToast = useToastStore(s => s.addToast);
  const addToEvent = useAddToEvents();
  const [isEditing, toggleEditing] = useReducer(i => !i, false);
  const [removing, setRemoving] = useState(null);
  const [adding, setAdding] = useState(null);
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

  const saveWaitingList = useCallback(
    async (waitingList, i18nError) => {
      try {
        await updateEvent({
          variables: {id: event.id, eventUpdate: {waiting_list: waitingList}},
        });
        addToEvent(event.id);
      } catch (error) {
        console.error(error);
        addToast(t(i18nError));
      }
    },
    [event, addToEvent] // eslint-disable-line
  );

  const addPassenger = useCallback(
    async passenger =>
      saveWaitingList(
        [...(event.waiting_list || []), passenger],
        'passenger.errors.cant_add_passenger'
      ),
    [event, saveWaitingList] // eslint-disable-line
  );

  const removePassenger = useCallback(
    async index => {
      return saveWaitingList(
        event.waiting_list.filter((_, i) => i !== index),
        'passenger.errors.cant_remove_passenger'
      );
    },
    [event, saveWaitingList] // eslint-disable-line
  );

  const selectCar = useCallback(
    async car => {
      try {
        await updateCar({
          variables: {
            id: car.id,
            carUpdate: {
              passengers: [
                ...(car.passengers || []),
                event.waiting_list[adding],
              ],
            },
          },
        });
        await updateEvent({
          variables: {
            id: event.id,
            eventUpdate: {
              waiting_list: event.waiting_list.filter((_, i) => i !== adding),
            },
          },
        });
      } catch (error) {
        console.error(error);
        addToast(t('passenger.errors.cant_select_car'));
      }
      setAdding(null);
    },
    [event, adding] // eslint-disable-line
  );

  const onPress = useCallback(
    index => {
      if (isEditing) setRemoving(index);
      else setAdding(index);
    },
    [isEditing]
  );

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.header}>
          <IconButton
            size="small"
            color="primary"
            className={classes.editBtn}
            disabled={!event.waiting_list || !event.waiting_list.length}
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
          passengers={event.waiting_list}
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
              name: event.waiting_list ? event.waiting_list[removing] : null,
            }}
            components={{italic: <i />, bold: <strong />}}
          />
        }
        open={removing !== null}
        onClose={() => setRemoving(null)}
        onRemove={() => removePassenger(removing)}
      />
      <CarDialog
        cars={cars}
        open={adding !== null}
        onClose={() => setAdding(null)}
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
