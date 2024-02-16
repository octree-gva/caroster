import {useMemo, useReducer} from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import {useTheme} from '@mui/styles';
import {useTranslation} from 'react-i18next';
import HeaderEditing from './HeaderEditing';
import Header from './Header';
import RequestTripModal from './RequestTripModal';
import useActions from './useActions';
import PassengersList from '../PassengersList';
import AddPassengerButtons from '../AddPassengerButtons';
import useProfile from '../../hooks/useProfile';
import usePermissions from '../../hooks/usePermissions';
import useMapStore from '../../stores/useMapStore';
import useEventStore from '../../stores/useEventStore';
import {TravelEntity} from '../../generated/graphql';
interface Props {
  travel: TravelEntity;
  onAddSelf: () => void;
  onAddOther: () => void;
}

const Travel = (props: Props) => {
  const {travel} = props;
  const isCarosterPlus = useEventStore(s => s.event.enabled_modules.includes('caroster-plus'));
  const {
    userPermissions: {canDeletePassenger, canJoinTravels, canAddToTravel},
  } = usePermissions();
  const {t} = useTranslation();
  const theme = useTheme();
  const [isEditing, toggleEditing] = useReducer(i => !i, false);
  const [requestTripModalOpen, toggleRequestTripModal] = useReducer(
    i => !i,
    false
  );
  const actions = useActions({travel});
  const {userId, connected} = useProfile();
  const {focusedTravel} = useMapStore();
  const focused = focusedTravel === travel.id;
  const disableNewPassengers =
    travel.attributes.passengers?.data?.length >= travel.attributes.seats;

  const registered = useMemo(() => {
    if (!connected) return false;
    const isInTravel = travel.attributes.passengers?.data.some(
      passenger => passenger.attributes.user?.data?.id === `${userId}`
    );
    return isInTravel;
  }, [travel, userId]);

  if (!travel) return null;

  return (
    <Paper
      sx={{
        position: 'relative',
        boxShadow: focused
          ? `0px 0px 5px 2px ${theme.palette.primary.main}`
          : 'none',
        scrollMarginTop: theme.spacing(2),
      }}
      id={travel.id}
    >
      <RequestTripModal
        open={requestTripModalOpen}
        toggle={toggleRequestTripModal}
        travel={travel}
      />
      {isEditing && (
        <HeaderEditing travel={travel} toggleEditing={toggleEditing} />
      )}
      {!isEditing && (
        <>
          <Header travel={travel} toggleEditing={toggleEditing} />
          {(canJoinTravels() || canAddToTravel()) && (
            <>
              <Divider />
              <AddPassengerButtons
                registered={registered}
                variant="travel"
                disabled={disableNewPassengers}
                onAddOther={props.onAddOther}
                onAddSelf={
                  isCarosterPlus ? toggleRequestTripModal : props.onAddSelf
                }
              />
            </>
          )}
          {travel.attributes.passengers.data.length > 0 && <Divider />}
          <PassengersList
            passengers={travel.attributes.passengers.data}
            onClick={actions.sendPassengerToWaitingList}
            travel={travel}
            Button={({onClick, passenger}) =>
              canDeletePassenger({
                id: passenger.id,
                attributes: {...passenger.attributes, travel: {data: travel}},
              }) && (
                <ListItemSecondaryAction>
                  <Button color="primary" onClick={onClick} tabIndex={-1}>
                    {t`travel.passengers.remove`}
                  </Button>
                </ListItemSecondaryAction>
              )
            }
          />
        </>
      )}
    </Paper>
  );
};

export default Travel;
