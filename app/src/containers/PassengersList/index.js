import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import Input from './Input';
import Passenger from './Passenger';

const PassengersList = ({
  hideEmpty,
  passengers,
  places = 0,
  addPassenger,
  icon,
  onClick,
  disabled,
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
            button={
              <IconButton
                size="small"
                color="primary"
                edge="end"
                onClick={() => onClick(index)}
                disabled={disabled}
              >
                <Icon>{icon}</Icon>
              </IconButton>
            }
          />
        ))}
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1, 0),
  },
}));

export default PassengersList;
