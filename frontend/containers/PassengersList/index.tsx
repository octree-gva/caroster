import List from '@mui/material/List';
import {styled, useTheme} from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import Passenger from './Passenger';
import {PassengerEntity} from '../../generated/graphql';

const PREFIX = 'PassengersList';

const classes = {
  container: `${PREFIX}-container`,
  passenger: `${PREFIX}-passenger`,
};

const Root = styled('div')(({theme}) => ({
  [`&.${classes.container}`]: {
    padding: theme.spacing(0, 0, 1, 0),
  },

  [`& .${classes.passenger}`]: {
    paddingRight: theme.spacing(12),
  },
}));

interface Props {
  passengers: PassengerEntity[];
  Button: ({
    onClick,
    disabled,
  }: {
    onClick: () => void;
    disabled?: boolean;
  }) => JSX.Element;
  disabled?: boolean;
  isTravel?: boolean;
  places?: number;
  onPress?: (passengerId: string) => void;
  onClick?: (passengerId: string) => void;
}

const PassengersList = (props: Props) => {
  const {passengers, places, Button, onClick, onPress, disabled, isTravel} =
    props;
  const theme = useTheme();

  let list = passengers;

  if (places) {
    const emptyList = [...Array(places)];
    list = Array.isArray(passengers)
      ? emptyList.map((u, index) => passengers[index])
      : emptyList;
  }

  return (
    <Root sx={{padding: theme.spacing(0, 0, 1, 0)}}>
      <List disablePadding>
        {!!list &&
          list.map((passenger, index) => (
            <ListItem
              sx={{paddingRight: theme.spacing(12)}}
              key={index}
              disabled={disabled}
              button={!!onPress}
              onClick={() => !!onPress && onPress(passenger.id)}
            >
              <Passenger
                key={index}
                passenger={passenger}
                isTravel={isTravel}
                button={
                  <Button
                    onClick={() => onClick && onClick(passenger.id)}
                    disabled={disabled}
                  />
                }
              />
            </ListItem>
          ))}
      </List>
    </Root>
  );
};

export default PassengersList;
