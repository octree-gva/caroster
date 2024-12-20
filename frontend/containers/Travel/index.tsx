import {useMemo, useReducer, useState} from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import {useTheme} from '@mui/styles';
import HeaderEditing from './HeaderEditing';
import Header from './Header';
import RequestTripModal from './RequestTripModal';
import PassengersList from '../PassengersList';
import AddPassengerButtons from '../AddPassengerButtons';
import useProfile from '../../hooks/useProfile';
import usePermissions from '../../hooks/usePermissions';
import useMapStore from '../../stores/useMapStore';
import useEventStore from '../../stores/useEventStore';
import {PassengerEntity, TravelEntity} from '../../generated/graphql';
import DrawerPassenger from '../DrawerPassenger';
import PassengerActions from './PassengerActions';

interface Props {
  travel: TravelEntity;
  onAddSelf: () => void;
  onAddOther: () => void;
}

const Travel = (props: Props) => {
  const {travel} = props;
  const isCarosterPlus = useEventStore(s =>
    s.event.enabled_modules?.includes('caroster-plus')
  );
  const {
    userPermissions: {canSeePassengerDetails},
  } = usePermissions();
  const theme = useTheme();
  const [isEditing, toggleEditing] = useReducer(i => !i, false);
  const [requestTripModalOpen, toggleRequestTripModal] = useReducer(
    i => !i,
    false
  );
  const {userId, connected} = useProfile();
  const focusedTravel = useMapStore(s => s.focusedTravel);
  const focused = focusedTravel === travel.id;
  const disableNewPassengers =
    travel.attributes.passengers?.data?.length >= travel.attributes.seats;

  const [focusPassenger, setFocusPassenger] = useState<PassengerEntity>();

  const registered = useMemo(() => {
    if (!connected) return false;
    const isInTravel = travel.attributes.passengers?.data.some(
      passenger => passenger.attributes.user?.data?.id === `${userId}`
    );
    return isInTravel;
  }, [travel, userId, connected]);

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
          {travel.attributes.passengers.data.length > 0 && <Divider />}
          <PassengersList
            passengers={travel.attributes.passengers.data}
            travel={travel}
            Actions={({passenger}) => (
              <PassengerActions
                passenger={passenger}
                travel={travel}
                setFocusPassenger={setFocusPassenger}
              />
            )}
          />
          {focusPassenger && canSeePassengerDetails(focusPassenger) && (
            <DrawerPassenger
              isOpen={!!focusPassenger}
              onClose={() => setFocusPassenger(undefined)}
              firstName={
                focusPassenger?.attributes.user?.data?.attributes.firstName
              }
              lastName={
                focusPassenger?.attributes.user?.data?.attributes.lastName
              }
              email={focusPassenger?.attributes.email}
              phone={focusPassenger?.attributes.phone}
              phoneCountry={focusPassenger?.attributes.phoneCountry}
            />
          )}
        </>
      )}
    </Paper>
  );
};

export default Travel;
