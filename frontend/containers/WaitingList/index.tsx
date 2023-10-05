import {useReducer, useState, useMemo, useCallback} from 'react';
import router from 'next/dist/client/router';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
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
import {PassengerEntity} from '../../generated/graphql';

interface Props {
  getToggleNewPassengerDialogFunction: (addSelf: boolean) => () => void;
  canAddSelf: boolean;
}

const WaitingList = ({
  getToggleNewPassengerDialogFunction,
  canAddSelf,
}: Props) => {
  const {t} = useTranslation();
  const clearToast = useToastStore(s => s.clearToast);
  const event = useEventStore(s => s.event);
  const addToast = useToastStore(s => s.addToast);
  const [isEditing, toggleEditing] = useReducer(i => !i, false);
  const [removingPassenger, setRemovingPassenger] = useState(null);
  const [addingPassenger, setAddingPassenger] = useState<PassengerEntity>(null);
  const travels =
    event?.travels?.data?.length > 0
      ? event?.travels?.data.slice().sort(sortTravels)
      : [];
  const {updatePassenger, removePassenger} = usePassengersActions();

  const availability = useMemo(() => {
    if (!travels) return;
    return travels.reduce((count, {attributes: {seats, passengers}}) => {
      if (!seats) return 0;
      else if (!passengers) return count + seats;
      return count + seats - passengers?.data?.length;
    }, 0);
  }, [travels]);

  const removePassengerCallback = useCallback(removePassenger, [event]);

  const selectTravel = useCallback(
    async travel => {
      try {
        await updatePassenger(addingPassenger.id, {
          travel: travel.id,
        });
        setAddingPassenger(null);
        addToast(
          t('passenger.success.added_to_car', {
            name: addingPassenger.attributes.name,
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
      const selectedPassenger = event?.waitingPassengers?.data.find(
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
      addToast(t('passenger.deleted'));
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
    <Container maxWidth="sm" sx={{mt: 11, mx: 4}}>
      <Paper sx={{width: '480px', maxWidth: '100%', position: 'relative'}}>
        <Box p={2}>
          <IconButton
            size="small"
            color="primary"
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              margin: 1,
            }}
            disabled={!event?.waitingPassengers?.data?.length}
            onClick={toggleEditing}
          >
            {isEditing ? <Icon>check</Icon> : <Icon>edit</Icon>}
          </IconButton>
          <Typography variant="h5">{t('passenger.title')}</Typography>
          <Typography variant="overline">
            {t('passenger.availability.seats', {count: availability})}
          </Typography>
        </Box>
        <Divider />
        <AddPassengerButtons
          getOnClickFunction={getToggleNewPassengerDialogFunction}
          canAddSelf={canAddSelf}
          variant="waitingList"
        />
        <Divider />
        {event?.waitingPassengers?.data?.length > 0 && (
          <PassengersList
            passengers={event.waitingPassengers.data}
            onPress={onPress}
            Button={ListButton}
          />
        )}
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
        eventName={event?.name}
        travels={travels}
        passenger={addingPassenger}
        open={!!addingPassenger}
        onClose={() => setAddingPassenger(null)}
        onSelect={selectTravel}
      />
    </Container>
  );
};

const sortTravels = (a, b) => {
  const dateA = new Date(a.departure).getTime();
  const dateB = new Date(b.departure).getTime();
  if (dateA === dateB)
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  else return dateA - dateB;
};

export default WaitingList;
