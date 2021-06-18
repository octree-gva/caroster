import {useReducer} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {useTranslation} from 'react-i18next';
import PassengersList from '../PassengersList';
import HeaderEditing from './HeaderEditing';
import Header from './Header';
import useEventStore from '../../stores/useEventStore';
import useToastStore from '../../stores/useToastStore';
import useAddToEvents from '../../hooks/useAddToEvents';
import {
  useUpdateCarMutation,
  useUpdateEventMutation,
} from '../../generated/graphql';

const Car = ({car}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const event = useEventStore(s => s.event);
  const addToast = useToastStore(s => s.addToast);
  const [isEditing, toggleEditing] = useReducer(i => !i, false);
  const [updateEvent] = useUpdateEventMutation();
  const [updateCar] = useUpdateCarMutation();
  const {addToEvent} = useAddToEvents();

  if (!car) return null;

  const addPassenger = async passenger => {
    try {
      await updateCar({
        variables: {
          id: car.id,
          carUpdate: {
            passengers: [...(car.passengers || []), passenger],
          },
        },
      });
      addToEvent(event.id);
    } catch (error) {
      console.error(error);
    }
  };

  const removePassenger = async idx => {
    if (car?.passengers) {
      try {
        await updateEvent({
          variables: {
            id: event.id,
            eventUpdate: {
              waiting_list: [
                ...(event.waiting_list || []),
                car.passengers[idx],
              ],
            },
          },
        });
        await updateCar({
          variables: {
            id: car.id,
            carUpdate: {
              passengers: car.passengers.filter((_, i) => i !== idx),
            },
          },
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
