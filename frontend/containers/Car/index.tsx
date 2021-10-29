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
  Car as CarType,
  EditComponentPassengerPassengerInput as PassengerInput,
} from '../../generated/graphql';

interface Props {
  car: CarType;
}

const Car = (props: Props) => {
  const {car} = props;
  const classes = useStyles();
  const {t} = useTranslation();
  const event = useEventStore(s => s.event);
  const addToast = useToastStore(s => s.addToast);
  const [isEditing, toggleEditing] = useReducer(i => !i, false);
  const [updateEvent] = useUpdateEventMutation();
  const [updateCar] = useUpdateCarMutation();
  const {addToEvent} = useAddToEvents();

  if (!car) return null;

  const addPassenger = async (passenger: PassengerInput) => {
    try {
      const existingPassengers =
        car.passengers?.map(({__typename, ...item}) => item) || [];
      const passengers = [...existingPassengers, passenger];
      await updateCar({
        variables: {
          id: car.id,
          carUpdate: {
            passengers,
          },
        },
      });
      addToEvent(event.id);
    } catch (error) {
      console.error(error);
    }
  };

  const removePassenger = async (passengerId: string) => {
    if (car?.passengers) {
      try {
        const {id, ...removedPassenger} =
          car.passengers?.find(item => item.id === passengerId) || {};
        const existingPassengers =
          car.passengers?.map(({__typename, ...item}) => item) || [];
        const waitingList = [...event.waitingList, removedPassenger].map(
          ({__typename, ...item}) => item
        );
        const passengers = existingPassengers.filter(
          item => item.id !== passengerId
        );
        await updateEvent({
          variables: {
            uuid: event.uuid,
            eventUpdate: {
              waitingList,
            },
          },
        });
        await updateCar({
          variables: {
            id: car.id,
            carUpdate: {
              passengers,
            },
          },
          refetchQueries: ['eventByUUID'],
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
          isCar
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
