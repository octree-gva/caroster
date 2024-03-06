import {Box, Icon, IconButton} from '@mui/material';
import usePermissions from '../../hooks/usePermissions';
import useActions from './useActions';
import {PassengerEntity, TravelEntity} from '../../generated/graphql';

type Props = {
  passenger: PassengerEntity;
  travel: TravelEntity;
  setFocusPassenger: (passenger: PassengerEntity) => void;
};

const PassengerActions = (props: Props) => {
  const {passenger, travel, setFocusPassenger} = props;
  const {
    userPermissions: {canDeletePassenger, canSeePassengerDetails},
  } = usePermissions();
  const actions = useActions({travel});

  return (
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
            onClick={() => actions.removePassengerFromTravel(passenger.id)}
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
  );
};

export default PassengerActions;
