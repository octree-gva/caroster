import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Passenger from './Passenger';
import Input from './Input';

const PassengersList = ({
  hideEmpty,
  passengers,
  places = 0,
  addPassenger,
  removePassenger,
}) => {
  const classes = useStyles();

  let list = passengers;

  if (!hideEmpty) {
    const emptyList = [...Array(places)];
    list = Array.isArray(passengers)
      ? emptyList.map((u, index) => passengers[index])
      : emptyList;
  }

  const emptyPlaces = !!passengers ? places - passengers.length : places;

  return (
    <div className={classes.container}>
      {emptyPlaces > 0 && <Input addPassenger={addPassenger} />}
      {!!places &&
        !!list &&
        list.map((passenger, index) => (
          <Passenger
            key={index}
            passenger={passenger}
            removePassenger={() => removePassenger(index)}
          />
        ))}
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  container: {padding: theme.spacing(1, 0)},
}));

export default PassengersList;
