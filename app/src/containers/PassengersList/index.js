import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import {makeStyles} from '@material-ui/core/styles';
import Input from './Input';
import Passenger from './Passenger';

const PassengersList = ({
  passengers,
  places,
  addPassenger,
  icon,
  onClick,
  onPress,
  disabled,
}) => {
  const classes = useStyles();

  let list = passengers;

  if (!!places) {
    const emptyList = [...Array(places)];
    list = Array.isArray(passengers)
      ? emptyList.map((u, index) => passengers[index])
      : emptyList;
  }

  const button = index => {
    return !!onClick ? (
      <ListItemSecondaryAction>
        <IconButton size="small" color="primary" onClick={() => onClick(index)}>
          <Icon>{icon}</Icon>
        </IconButton>
      </ListItemSecondaryAction>
    ) : (
      <Icon color="primary">{icon}</Icon>
    );
  };

  return (
    <div className={classes.container}>
      {(!!places
        ? !!passengers
          ? places - passengers.length > 0
          : places > 0
        : true) && <Input addPassenger={addPassenger} />}
      <List disablePadding>
        {!!list &&
          list.map((passenger, index) => (
            <ListItem
              key={index}
              disabled={disabled}
              button={!!onPress}
              onClick={() => !!onPress && onPress(index)}
            >
              <Passenger
                key={index}
                passenger={passenger}
                button={button(index)}
              />
            </ListItem>
          ))}
      </List>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1, 0),
  },
}));

export default PassengersList;
