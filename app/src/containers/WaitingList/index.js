import React, {useReducer, useState, useEffect} from 'react';
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

const WaitingList = ({car}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const {event} = useEvent();
  const {addToast} = useToast();
  const strapi = useStrapi();
  const [passengers, setPassengers] = useState(event.waiting_list);
  const [isEditing, toggleEditing] = useReducer(i => !i, false);
  const [removing, setRemoving] = useState(null);
  const [adding, setAdding] = useState(null);

  useEffect(() => {
    setPassengers(event.waiting_list);
  }, [event.waiting_list]);

  const addPassenger = async passenger => {
    try {
      await strapi.services.events.update(event.id, {
        waiting_list: [...(event.waiting_list || []), passenger],
      });
    } catch (error) {
      console.error(error);
      addToast(t('passenger.errors.cant_add_passenger'));
    }
  };

  const removePassenger = index => {
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  const savePassengers = async () => {
    try {
      await strapi.services.events.update(event.id, {waiting_list: passengers});
    } catch (error) {
      console.error(error);
      addToast(t('passenger.errors.cant_save_passengers'));
    }
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

  const onEdit = () => {
    if (isEditing) savePassengers();
    toggleEditing();
  };

  const onClick = index => {
    if (isEditing) setRemoving(index);
    else setAdding(index);
  };

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.header}>
          <IconButton
            size="small"
            color="primary"
            className={classes.editBtn}
            onClick={onEdit}
          >
            {isEditing ? <Icon>check</Icon> : <Icon>edit</Icon>}
          </IconButton>
          <Typography variant="h5">{t('passenger.title')}</Typography>
        </div>
        <Divider />
        <PassengersList
          hideEmpty
          places={50}
          passengers={passengers}
          addPassenger={addPassenger}
          onClick={onClick}
          icon={isEditing ? 'close' : 'chevron_right'}
        />
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
        onRemove={() => removePassenger(removing)}
      />
      <CarDialog
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
