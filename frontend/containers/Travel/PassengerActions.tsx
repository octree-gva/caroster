import {useState} from 'react';
import {Box, Icon, IconButton} from '@mui/material';
import usePermissions from '../../hooks/usePermissions';
import RemovePassengerModal from './RemovePassengerModal';
import useActions from './useActions';
import {PassengerEntity, TravelEntity} from '../../generated/graphql';

type Props = {
  passenger: PassengerEntity;
  travel: TravelEntity;
  setFocusPassenger: (passenger: PassengerEntity) => void;
};

const PassengerActions = (props: Props) => {
  const {passenger, travel, setFocusPassenger} = props;
  const [isRemovingPassenger, setIsRemovingPassenger] = useState(false);
  const {
    userPermissions: {canDeletePassenger, canSeePassengerDetails},
  } = usePermissions();
  const {removePassengerFromTravel} = useActions({travel});

  return (
    <>
      <Box display="flex">
        {canDeletePassenger(passenger) && {
            id: passenger.id,
            attributes: {
              ...passenger.attributes,
              travel: {data: travel},
            },
          } && (
            <IconButton
              color="primary"
              onClick={() => setIsRemovingPassenger(true)}
              tabIndex={-1}
            >
              <Icon>delete_outline</Icon>
            </IconButton>
          )}
        {canSeePassengerDetails(passenger) && (
          <IconButton
            color="primary"
            onClick={() => setFocusPassenger(passenger)}
          >
            <Icon>info_outlined</Icon>
          </IconButton>
        )}
      </Box>
      <RemovePassengerModal
        passenger={isRemovingPassenger && passenger}
        close={() => setIsRemovingPassenger(false)}
        removePassenger={removePassengerFromTravel}
      />
    </>
  );
};

export default PassengerActions;
