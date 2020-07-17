import React, {useReducer, useState, useMemo} from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import {Trans, useTranslation} from 'react-i18next';
import {useStrapi} from 'strapi-react-context';
import {useEvent} from '../../contexts/Event';
import {useToast} from '../../contexts/Toast';
import PassengersList from '../PassengersList';
import RemoveDialog from '../RemoveDialog';
import CarDialog from './CarDialog';

const sortCars = (a, b) => {
  const dateA = new Date(a.departure).getTime();
  const dateB = new Date(b.departure).getTime();
  if (dateA === dateB) return new Date(a.createdAt) - new Date(b.createdAt);
  else return dateA - dateB;
};

const WaitingList = ({car}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const {event} = useEvent();
  const {addToast} = useToast();
  const strapi = useStrapi();
  const [isEditing, toggleEditing] = useReducer(i => !i, false);
  const [removing, setRemoving] = useState(null);
  const [adding, setAdding] = useState(null);
  const passengers = event.waiting_list;

  const cars = useMemo(
    () =>
      strapi.stores.cars
        ?.filter(car => car?.event?.id === event?.id)
        .sort(sortCars),
    [strapi.stores.cars, event]
  );

  const availability = useMemo(() => {
    if (!cars) return;
    return cars.reduce((count, {seats, passengers = []}) => {
      return count + seats - passengers.length;
    }, 0);
  }, [cars]);

  const saveWaitingList = async (waitingList, i18nError) => {
    try {
      await strapi.services.events.update(event.id, {
        waiting_list: waitingList,
      });
    } catch (error) {
      console.error(error);
      addToast(t(i18nError));
    }
  };

  const addPassenger = async passenger => {
    return saveWaitingList(
      [...(event.waiting_list || []), passenger],
      'passenger.errors.cant_add_passenger'
    );
  };

  const removePassenger = index => {
    return saveWaitingList(
      passengers.filter((_, i) => i !== index),
      'passenger.errors.cant_remove_passenger'
    );
  };

  const selectCar = async car => {
    try {
      await strapi.services.cars.update(car.id, {
        passengers: [...(car.passengers || []), passengers[adding]],
      });
      await strapi.services.events.update(event.id, {
        waiting_list: event.waiting_list.filter((_, i) => i !== adding),
      });
    } catch (error) {
      console.error(error);
      addToast(t('passenger.errors.cant_select_car'));
    }
    setAdding(null);
  };

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.header}>
          <IconButton
            size="small"
            color="primary"
            className={classes.editBtn}
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
        {isEditing ? (
          <PassengersList
            hideEmpty
            places={Number.MAX_SAFE_INTEGER}
            passengers={passengers}
            addPassenger={addPassenger}
            onPress={setRemoving}
            icon={'close'}
            disabled={false}
          />
        ) : (
          <PassengersList
            hideEmpty
            places={Number.MAX_SAFE_INTEGER}
            passengers={passengers}
            addPassenger={addPassenger}
            onPress={setAdding}
            icon={'chevron_right'}
            disabled={availability <= 0}
          />
        )}
      </Paper>
      <RemoveDialog
        text={
          <Trans
            i18nKey="passenger.actions.remove_alert"
            values={{name: passengers ? passengers[removing] : null}}
            components={{italic: <i />, bold: <strong />}}
          />
        }
        open={removing !== null}
        onClose={() => setRemoving(null)}
        onRemove={async () => removePassenger(removing)}
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
