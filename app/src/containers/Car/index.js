import React, {useReducer} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {useTranslation} from 'react-i18next';
import {useStrapi} from 'strapi-react-context';
import {useEvent} from '../../contexts/Event';
import {useToast} from '../../contexts/Toast';
import useProfile from '../../hooks/useProfile';
import PassengersList from '../PassengersList';
import HeaderEditing from './HeaderEditing';
import Header from './Header';

const Car = ({car}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const strapi = useStrapi();
  const {event} = useEvent();
  const {addEvent} = useProfile();
  const {addToast} = useToast();
  const [isEditing, toggleEditing] = useReducer(i => !i, false);

  if (!car) return null;

  const addPassenger = async passenger => {
    try {
      await strapi.services.cars.update(car.id, {
        passengers: [...(car.passengers || []), passenger],
      });
      addEvent(event);
    } catch (error) {
      console.error(error);
    }
  };

  const removePassenger = async idx => {
    if (car?.passengers) {
      try {
        await strapi.services.events.update(event.id, {
          waiting_list: [...(event.waiting_list || []), car.passengers[idx]],
        });
        await strapi.services.cars.update(car.id, {
          passengers: car.passengers.filter((_, i) => i !== idx),
        });
      } catch (error) {
        console.error(error);
        addToast(t('car.errors.cant_remove_passenger'));
      }
    }
  };

  return (
    <Paper className={classes.root}>
      {isEditing ? (
        <HeaderEditing car={car} toggleEditing={toggleEditing} />
      ) : (
        <Header car={car} toggleEditing={toggleEditing} />
      )}
      <Divider />
      {!isEditing && (
        <PassengersList
          passengers={car.passengers}
          places={car.seats}
          addPassenger={addPassenger}
          onClick={removePassenger}
          icon="close"
        />
      )}
    </Paper>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
}));

export default Car;
