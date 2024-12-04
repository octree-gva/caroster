import {
  Box,
  Button,
  Container,
  List,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  PassengerInput,
  TravelEntity,
  TripAlertEntity,
  useCreatePassengerMutation,
  useEventTripAlertsQuery,
} from '../../generated/graphql';
import WaitingListItem from './WaitingListItem';
import {useState} from 'react';
import TravelSelectionModal from './TravelSelectionModal';
import useEventStore from '../../stores/useEventStore';
import useToastStore from '../../stores/useToastStore';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import ListHeader from './ListHeader';

type Props = {};

const TripAlertsList = (props: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const [focusAlert, setFocusAlert] = useState<TripAlertEntity>(null);
  const [createPassenger] = useCreatePassengerMutation();
  const event = useEventStore(s => s.event);
  const addToast = useToastStore(s => s.addToast);
  const clearToast = useToastStore(s => s.clearToast);

  const {data} = useEventTripAlertsQuery({
    variables: {uuid: event?.uuid},
    skip: !event?.uuid,
  });
  const tripAlerts =
    data?.eventByUUID?.data?.attributes?.tripAlerts?.data || [];

  const onAssign = async (travel: TravelEntity) => {
    try {
      const user = focusAlert.attributes.user.data;
      const passenger: PassengerInput = {
        email: user.attributes.email,
        location: focusAlert.attributes.address,
        travel: travel.id,
        user: user.id,
        event: event.id,
        name: user.attributes.firstName
          ? `${user.attributes.firstName} ${user.attributes.lastName}`
          : user.attributes.email,
      };
      await createPassenger({
        variables: {passenger},
        refetchQueries: ['eventTripAlerts'],
      });
      setFocusAlert(null);
      addToast(
        t('passenger.success.added_to_car', {
          name: passenger.name,
        }),
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => {
            router.push(`/e/${event.uuid}`);
            clearToast();
          }}
        >
          {t('passenger.success.goToTravels')}
        </Button>
      );
    } catch (error) {
      console.error(error);
      addToast(t`passenger.errors.cant_select_travel`);
    }
  };

  if (!tripAlerts || tripAlerts.length === 0)
    return (
      <Container maxWidth="sm" sx={{mt: 11, mx: 0, px: mobile ? 2 : 4}}>
        <Paper sx={{width: '480px', maxWidth: '100%'}}>
          <ListHeader />
          <Box p={2} textAlign="center">
            <Typography variant="caption">{t`passenger.waitingList.empty`}</Typography>
          </Box>
        </Paper>
      </Container>
    );

  return (
    <Container maxWidth="sm" sx={{mt: 11, mx: 0, px: mobile ? 2 : 4}}>
      <Paper sx={{width: '480px', maxWidth: '100%'}}>
        <ListHeader />
        <List>
          {tripAlerts.map((tripAlert, idx, arr) => (
            <WaitingListItem
              key={tripAlert.id}
              tripAlert={tripAlert}
              onClick={() => setFocusAlert(tripAlert)}
              isLast={idx === arr.length - 1}
            />
          ))}
        </List>
      </Paper>
      <TravelSelectionModal
        open={!!focusAlert}
        onClose={() => setFocusAlert(null)}
        onAssign={onAssign}
      />
    </Container>
  );
};

export default TripAlertsList;
