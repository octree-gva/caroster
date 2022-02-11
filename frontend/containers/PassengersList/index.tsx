import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {makeStyles} from '@material-ui/core/styles';
import Passenger from './Passenger';
import {
  ComponentPassengerPassenger,
  EditComponentPassengerPassengerInput as PassengerInput,
} from '../../generated/graphql';

interface Props {
  passengers: ComponentPassengerPassenger[];
  Button: JSX.Element;
  disabled?: boolean;
  isVehicle?: boolean;
  places?: number;
  onPress?: (passengerId: string) => void;
  onClick?: (passengerId: string) => void;
}

const PassengersList = (props: Props) => {
  const {passengers, places, Button, onClick, onPress, disabled, isVehicle} =
    props;
  const classes = useStyles();
  let list = passengers;

  if (places) {
    const emptyList = [...Array(places)];
    list = Array.isArray(passengers)
      ? emptyList.map((u, index) => passengers[index])
      : emptyList;
  }

  return (
    <div className={classes.container}>
      <List disablePadding>
        {!!list &&
          list.map((passenger, index) => (
            <ListItem
              className={classes.passenger}
              key={index}
              disabled={disabled}
              button={!!onPress}
              onClick={() => !!onPress && onPress(passenger.id)}
            >
              <Passenger
                key={index}
                passenger={passenger}
                isVehicle={isVehicle}
                button={
                  <Button onClick={() => onClick && onClick(passenger.id)} />
                }
              />
            </ListItem>
          ))}
      </List>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(0, 0, 1, 0),
  },
  passenger: {
    paddingRight: theme.spacing(12),
  },
}));

export default PassengersList;
