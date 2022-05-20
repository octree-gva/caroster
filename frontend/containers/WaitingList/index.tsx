import {useReducer, useState, useMemo, useCallback} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import {Trans, useTranslation} from 'react-i18next';
import useToastStore from '../../stores/useToastStore';
import useEventStore from '../../stores/useEventStore';
import useAddToEvents from '../../hooks/useAddToEvents';
import PassengersList from '../PassengersList';
import RemoveDialog from '../RemoveDialog';
import AddPassengerButtons from '../AddPassengerButtons';
import TravelDialog from './TravelDialog';
import ClearButton from '../ClearButton';
import AssignButton from './AssignButton';
import usePassengersActions from '../../hooks/usePassengersActions';

interface Props {
  getToggleNewPassengerDialogFunction: (addSelf: boolean) => () => void;
  canAddSelf: boolean;
  slideToTravel: (travelId: string) => void;
}

const WaitingList = ({
  getToggleNewPassengerDialogFunction,
  canAddSelf,
  slideToTravel,
}: Props) => {
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
  const {addPassengerToTravel, removePassengerFromWaitingList} =
    usePassengersActions();

  const availability = useMemo(() => {
    if (!travels) return;
    return travels.reduce((count, {vehicle, passengers = []}) => {
      if (!vehicle) return 0;
      else if (!passengers) return count + vehicle.seats;
      return count + vehicle.seats - passengers.length;
    }, 0);
  }, [travels]);

  const removePassengerFromWaitingListFallBack = useCallback(
    removePassengerFromWaitingList,
    [event]
  );

  const selectTravel = useCallback(
    async travel => {
      const {id, ...passenger} = addingPassenger;

      try {
        await addPassengerToTravel({
          travel,
          passenger,
        });
        await removePassengerFromWaitingListFallBack({
          passenger: addingPassenger,
          event: {
            ...event,
            waitingList: event.waitingList.filter(
              item => item.id !== addingPassenger.id
            ),
          },
        });
        setAddingPassenger(null);
        slideToTravel(travel.id);
        addToast(
          t('passenger.success.added_to_car', {
            name: addingPassenger.name,
          })
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
      const selectedPassenger = event.waitingList.find(
        item => item.id === passengerId
      );
      if (isEditing) setRemovingPassenger(selectedPassenger);
      else setAddingPassenger(selectedPassenger);
    },
    [isEditing, event]
  );

  const onRemove = async () => {
    try {
      await removePassengerFromWaitingListFallBack({
        passenger: removingPassenger,
        event,
      });
      addToEvent(event.id);
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
        <AddPassengerButtons
          getOnClickFunction={getToggleNewPassengerDialogFunction}
          canAddSelf={canAddSelf}
          variant="waitingList"
        />
        <Divider />
        <PassengersList
          passengers={event.waitingList}
          onPress={onPress}
          Button={ListButton}
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
        onRemove={onRemove}
      />
      <TravelDialog
        eventName={event.name}
        travels={travels}
        passenger={addingPassenger}
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
