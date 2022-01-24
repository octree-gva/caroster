import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import {makeStyles} from '@material-ui/core/styles';
import Input from './Input';
import Passenger from './Passenger';
import {
  ComponentPassengerPassenger,
  EditComponentPassengerPassengerInput as PassengerInput,
} from '../../generated/graphql';
import ClearButton from './ClearButton';

interface Props {
  passengers: ComponentPassengerPassenger[];
  icon: string;
  disabled?: boolean;
  isVehicle?: boolean;
  places?: number;
  onPress?: (passengerId: string) => void;
  onClick?: (passengerId: string) => void;
  addPassenger: (passenger: PassengerInput) => void;
}

const PassengersList = (props: Props) => {
  const {
    passengers,
    places,
    addPassenger,
    icon,
    onClick,
    onPress,
    disabled,
    isVehicle,
  } = props;
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
      {(places
        ? passengers
          ? places - passengers.length > 0
          : places > 0
        : true) && (
        <Input
          addPassenger={addPassenger}
          id={!!places ? 'Vehicle' : 'Waiting'}
          isVehicle={isVehicle}
        />
      )}
      <List disablePadding>
        {!!list &&
          list.map((passenger, index) => (
            <ListItem
              key={index}
              disabled={disabled}
              button={!!onPress}
              onClick={() => !!onPress && onPress(passenger.id)}
            >
              <Passenger
                key={index}
                passenger={passenger}
                button={
                  <ClearButton
                    icon={icon}
                    onClick={() => onClick && onClick(passenger.id)}
                    tabIndex={-1}
                  />
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
    padding: theme.spacing(1, 0),
  },
}));

export default PassengersList;
