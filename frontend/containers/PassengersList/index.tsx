import {ListItem, List, styled, useTheme} from '@mui/material';
import Passenger from './Passenger';
import {PassengerEntity, TravelEntity} from '../../generated/graphql';
import {ReactNode} from 'react';

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
  travel?: TravelEntity;
  onClickPassenger?: (passengerId: string) => void;
  Actions?: (props: {passenger: PassengerEntity}) => ReactNode;
}

const PassengersList = (props: Props) => {
  const {passengers, onClickPassenger, travel, Actions} = props;
  const theme = useTheme();

  return (
    <Root sx={{padding: theme.spacing(0, 0, 1, 0)}}>
      <List disablePadding>
        {!!passengers &&
          passengers.map((passenger, index) => (
            <ListItem
              key={index}
              button={!!onClickPassenger}
              onClick={() => onClickPassenger?.(passenger.id)}
            >
              <Passenger
                key={index}
                passenger={{
                  id: passenger.id,
                  attributes: {...passenger.attributes, travel: {data: travel}},
                }}
                isTravel={!!travel}
                Actions={Actions}
              />
            </ListItem>
          ))}
      </List>
    </Root>
  );
};

export default PassengersList;
