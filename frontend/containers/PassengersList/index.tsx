import {useState} from 'react';
import {ListItem, List, styled, useTheme} from '@mui/material';
import Passenger from './Passenger';
import {PassengerEntity, TravelEntity} from '../../generated/graphql';

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

export type PassengerButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  passenger?: PassengerEntity;
  disabled?: boolean;
}) => JSX.Element;

interface Props {
  passengers: PassengerEntity[];
  Button: PassengerButton;
  travel?: TravelEntity;
  onPress?: (passengerId: string) => void;
  onClick?: (passengerId: string) => void;
}

const PassengersList = (props: Props) => {
  const {passengers, Button, onClick, onPress, travel} = props;

  const theme = useTheme();

  let list = passengers;

  return (
    <Root sx={{padding: theme.spacing(0, 0, 1, 0)}}>
      <List disablePadding>
        {!!list &&
          list.map((passenger, index) => (
            <ListItem
              sx={{paddingRight: theme.spacing(12)}}
              key={index}
              button={!!onPress}
              onClick={() => !!onPress && onPress(passenger.id)}
            >
              <Passenger
                key={index}
                passenger={{
                  id: passenger.id,
                  attributes: {...passenger.attributes, travel: {data: travel}},
                }}
                isTravel={!!travel}
                button={
                  <Button
                    passenger={passenger}
                    onClick={() => onClick && onClick(passenger.id)}
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
