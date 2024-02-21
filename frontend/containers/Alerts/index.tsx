import {useReducer} from 'react';
import {Box, Container, Paper, useMediaQuery} from '@mui/material';
import theme from '../../theme';
import {EventEntity, TripAlertEntity} from '../../generated/graphql';

import AlertsHeader from './AlertsHead';
import AlertsForm from './AlertsForm';

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
          <AlertsHeader
            event={event}
            switchChecked={switchChecked}
            handleToggle={handleToggle}
            disabled={switchChecked}
          />
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
