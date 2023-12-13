import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import ShareEvent from '../ShareEvent';
import useToastStore from '../../stores/useToastStore';
import useEventStore from '../../stores/useEventStore';
import usePassengersActions from '../../hooks/usePassengersActions';
import AvailableTravel, {SelectTravel} from './AvailableTravel';

const AssignPassenger = () => {
  const {t} = useTranslation();
  const {addToast, clearToast} = useToastStore(({addToast, clearToast}) => ({
    addToast,
    clearToast,
  }));
  const event = useEventStore(s => s.event);

  const router = useRouter();
  const {
    query: {passengerId},
  } = router;
  const {updatePassenger} = usePassengersActions();

  if (!event) {
    return null;
  }
  const {travels, name, waitingPassengers, uuid} = event;

  const availableTravels = travels?.data?.filter(
    ({attributes}) =>
      attributes.passengers &&
      attributes?.seats > attributes.passengers.data.length
  );
  const passenger = waitingPassengers.data?.find(
    waitingPassenger => waitingPassenger.id === passengerId
  );

  const assign: SelectTravel = async travel => {
    try {
      await updatePassenger(passengerId, {
        travel: travel.id,
      });
      addToast(
        t('passenger.success.added_to_car', {
          name: passenger.attributes.name,
        }),
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => {
            router.push(`/e/${uuid}`);
            clearToast();
          }}
        >
          {t('passenger.success.goToTravels')}
        </Button>
      );
    } catch (error) {
      console.error(error);
      addToast(t('passenger.errors.cant_select_travel'));
    }
  };

  return (
    <Container maxWidth="sm" sx={{mt: 7, mx: 0, p: 4}}>
      <Paper sx={{width: '480px', maxWidth: '100%', position: 'relative'}}>
        <div>
          {availableTravels.length === 0 && (
            <Box sx={{p: 2, textAlign: 'center'}}>
              <Typography variant="h4">
                {t('passenger.assign.no_travel.title')}
              </Typography>
              <Typography variant="body1" sx={{py: 2}}>
                {t('passenger.assign.no_travel.desc', {
                  name: passenger?.attributes?.name,
                })}
              </Typography>
              <ShareEvent title={`Caroster ${name}`} />
            </Box>
          )}
          {availableTravels.length > 0 && (
            <>
              <Typography
                sx={{p: 2}}
                variant="h4"
              >{t`passenger.assign.availableCars`}</Typography>
              <List disablePadding>
                {availableTravels.map(({id, attributes}, index) => {
                  return (
                    <AvailableTravel
                      key={index}
                      travel={{id, ...attributes}}
                      select={assign}
                    />
                  );
                })}
              </List>
            </>
          )}
        </div>
      </Paper>
    </Container>
  );
};

export default AssignPassenger;
