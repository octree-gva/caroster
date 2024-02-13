import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../../theme';
import AlertsHead from './AlertsHead';
import AlertsForm from './AlertsForm';
import {useReducer} from 'react';
import {EventEntity, TripAlertEntity} from '../../generated/graphql';

interface Props {
  event: EventEntity;
  tripAlertEntity: TripAlertEntity;
}

const Alerts = ({event, tripAlertEntity}: Props) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [switchChecked, handleToggle] = useReducer(
    i => !i,
    tripAlertEntity?.attributes.enabled || false
  );

  return (
    <Container maxWidth="sm" sx={{mt: 11, mx: 0, px: isMobile ? 2 : 4}}>
      <Paper sx={{width: '480px', maxWidth: '100%', position: 'relative'}}>
        <Box p={2}>
          <AlertsHead handleToggle={handleToggle} checked={switchChecked} />
          <AlertsForm
            event={event}
            disabled={!switchChecked}
            tripAlertEntity={tripAlertEntity}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Alerts;
