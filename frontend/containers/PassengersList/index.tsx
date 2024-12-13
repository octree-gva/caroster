import {ListItem, List, Box} from '@mui/material';
import Passenger from './Passenger';
import {PassengerEntity, TravelEntity} from '../../generated/graphql';
import {ReactNode} from 'react';

interface Props {
  passengers: PassengerEntity[];
  travel?: TravelEntity;
  onClickPassenger?: (passengerId: string) => void;
  Actions?: (props: {passenger: PassengerEntity}) => ReactNode;
}

const PassengersList = (props: Props) => {
  const {passengers, onClickPassenger, travel, Actions} = props;

  return (
    <Box pb={1}>
      <List disablePadding>
        {passengers?.map((passenger, index) => (
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
    </Box>
  );
};

export default PassengersList;
