import React, {useReducer} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import Paper from '@material-ui/core/Paper';
import {useTranslation} from 'react-i18next';
import {useStrapi} from 'strapi-react-context';
import PassengersList from '../PassengersList';
import {useToast} from '../../contexts/Toast';
import Header from './Header';
import HeaderEditing from './HeaderEditing';

const Car = ({car}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const {addToast} = useToast();
  const strapi = useStrapi();
  const [isEditing, toggleEditing] = useReducer(i => !i, false);

  if (!car) return null;

  const addPassenger = async passenger => {
    try {
      await strapi.services.cars.update(car.id, {
        passengers: [...(car.passengers || []), passenger],
      });
    } catch (error) {
      console.error(error);
      addToast(t('car.errors.cant_add_passenger'));
    }
  };

  const removePassenger = async idx => {
    if (!car?.passengers) return false;
    try {
      return await strapi.services.cars.update(car.id, {
        passengers: car.passengers.filter((_, i) => i !== idx),
      });
    } catch (error) {
      console.error(error);
      addToast(t('car.errors.cant_remove_passenger'));
      return false;
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
      <PassengersList
        passengers={car.passengers}
        places={car.seats}
        addPassenger={addPassenger}
        removePassenger={removePassenger}
      />
    </Paper>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
}));

export default Car;
