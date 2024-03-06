import {useReducer, useState, useMemo, useCallback} from 'react';
import router from 'next/dist/client/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {useTheme} from '@mui/material/styles';
import {Trans, useTranslation} from 'react-i18next';
import useToastStore from '../../stores/useToastStore';
import useEventStore from '../../stores/useEventStore';
import usePassengersActions from '../../hooks/usePassengersActions';
import RemoveDialog from '../RemoveDialog';
import AddPassengerButtons from '../AddPassengerButtons';
import AssignButton from './AssignButton';
import PassengersList from '../PassengersList';

interface Props {
  canAddSelf: boolean;
  registered: boolean;
  onAddSelf: () => void;
  onAddOther: () => void;
}

const WaitingList = (props: Props) => {
  const {canAddSelf, registered} = props;
  const {t} = useTranslation();
  const event = useEventStore(s => s.event);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const addToast = useToastStore(s => s.addToast);
  const [isEditing, toggleEditing] = useReducer(i => !i, false);
  const [removingPassenger, setRemovingPassenger] = useState(null);
  const travels = useMemo(
    () =>
      event?.travels?.data?.length > 0
        ? event?.travels?.data.slice().sort(sortTravels)
        : [],
    [event?.travels?.data]
  );
  const {removePassenger} = usePassengersActions();

  const availability = useMemo(() => {
    if (!travels) return;
    return travels.reduce((count, {attributes: {seats, passengers}}) => {
      if (!seats) return 0;
      else if (!passengers) return count + seats;
      return count + seats - passengers?.data?.length;
    }, 0);
  }, [travels]);

  const removePassengerCallback = useCallback(removePassenger, [
    event,
    removePassenger,
  ]);

  const onClickPassenger = useCallback(
    (passengerId: string) => {
      const selectedPassenger = event?.waitingPassengers?.data.find(
        item => item.id === passengerId
      );
      if (isEditing) setRemovingPassenger(selectedPassenger);
      else router.push(`/e/${event.uuid}/assign/${selectedPassenger.id}`);
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

  return (
    <Container maxWidth="sm" sx={{mt: 11, mx: 0, px: mobile ? 2 : 4}}>
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
            {isEditing ? <Icon>check</Icon> : <TuneIcon />}
          </IconButton>
          <Typography variant="h5">{t('passenger.title')}</Typography>
          <Typography variant="overline">
            {t('passenger.availability.seats', {count: availability})}
          </Typography>
        </Box>
        <Divider />
        <AddPassengerButtons
          onAddOther={props.onAddOther}
          onAddSelf={props.onAddSelf}
          canAddSelf={canAddSelf}
          registered={registered}
          variant="waitingList"
        />
        <Divider />
        {event?.waitingPassengers?.data?.length > 0 && (
          <PassengersList
            passengers={event.waitingPassengers.data}
            onClickPassenger={onClickPassenger}
            Actions={({passenger}) =>
              isEditing ? (
                <ListItemSecondaryAction>
                  <IconButton size="small" color="primary">
                    <CancelOutlinedIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              ) : (
                <AssignButton
                  tabIndex={-1}
                  onClick={() => onClickPassenger(passenger.id)}
                />
              )
            }
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
