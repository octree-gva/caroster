import {useReducer, useState, useMemo, useCallback} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import {Trans, useTranslation} from 'react-i18next';
import {
  useUpdateEventMutation,
  useUpdateTravelMutation,
  ComponentPassengerPassenger,
} from '../../generated/graphql';
import useToastStore from '../../stores/useToastStore';
import useEventStore from '../../stores/useEventStore';
import useAddToEvents from '../../hooks/useAddToEvents';
import PassengersList from '../PassengersList';
import RemoveDialog from '../RemoveDialog';
import AddPassengerButtons from '../AddPassengerButtons';
import TravelDialog from './TravelDialog';

const WaitingList = ({
  toggleNewPassenger,
}: {
  toggleNewPassenger: () => void;
}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const event = useEventStore(s => s.event);
  const addToast = useToastStore(s => s.addToast);
  const {addToEvent} = useAddToEvents();
  const [isEditing, toggleEditing] = useReducer(i => !i, false);
  const [removingPassenger, setRemovingPassenger] = useState(null);
  const [addingPassenger, setAddingPassenger] = useState(null);
  const travels =
    event?.travels?.length > 0 ? event.travels.slice().sort(sortTravels) : [];
  const [updateEvent] = useUpdateEventMutation();
  const [updateTravel] = useUpdateTravelMutation();

  const availability = useMemo(() => {
    if (!travels) return;
    return travels.reduce((count, {seats, passengers = []}) => {
      if (!passengers) return count + seats;
      return count + seats - passengers.length;
    }, 0);
  }, [travels]);

  const addPassenger = useCallback(
    async passenger => {
      try {
        const waitingList = [...event.waitingList, passenger].map(
          ({__typename, ...item}) => item
        );
        await updateEvent({
          variables: {uuid: event.uuid, eventUpdate: {waitingList}},
          refetchQueries: ['eventByUUID'],
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
    async (removingPassenger: ComponentPassengerPassenger) => {
      try {
        const waitingList = event.waitingList
          .filter(passenger => passenger.id !== removingPassenger?.id)
          .map(({__typename, ...item}) => item);
        await updateEvent({
          variables: {uuid: event.uuid, eventUpdate: {waitingList}},
          refetchQueries: ['eventByUUID'],
        });
        addToEvent(event.id);
      } catch (error) {
        console.error(error);
        addToast(t('passenger.errors.cant_remove_passenger'));
      }
    },
    [event]
  );

  const selectTravel = useCallback(
    async travel => {
      try {
        const {id, ...passenger} = addingPassenger;
        const travelPassengers = [...(travel.passengers || []), passenger].map(
          ({__typename, ...item}) => item
        );
        await updateTravel({
          variables: {
            id: travel.id,
            travelUpdate: {
              passengers: travelPassengers,
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
          refetchQueries: ['eventByUUID'],
        });
      } catch (error) {
        console.error(error);
        addToast(t('passenger.errors.cant_select_travel'));
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
        <div className={clsx(classes.header, 'tour_waiting_list')}>
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
        <AddPassengerButtons toggleNewPassenger={toggleNewPassenger} />
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
      <TravelDialog
        travels={travels}
        open={!!addingPassenger}
        onClose={() => setAddingPassenger(null)}
        onSelect={selectTravel}
      />
    </>
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
