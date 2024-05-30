import {useReducer} from 'react';
import {Box, Container, Paper, Typography, useMediaQuery} from '@mui/material';
import {useTranslation} from 'react-i18next';
import theme from '../../theme';
import usePermissions from '../../hooks/usePermissions';
import LoginToAttend from '../LoginToAttend/LoginToAttend';
import AlertsHeader from './AlertsHead';
import AlertsForm from './AlertsForm';
import {EventEntity, TripAlertEntity} from '../../generated/graphql';

interface Props {
  event: EventEntity;
  tripAlertEntity: TripAlertEntity;
}

const Alerts = ({event, tripAlertEntity}: Props) => {
  const {
    userPermissions: {canSetAlert},
  } = usePermissions();
  const {t} = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [switchChecked, handleToggle] = useReducer(
    i => !i,
    tripAlertEntity?.attributes.enabled || false
  );

  return (
    <Container maxWidth="sm" sx={{mt: 11, mx: 0, px: isMobile ? 2 : 4}}>
      {!canSetAlert() && (
          <Box sx={{width: '480px', maxWidth: '100%', position: 'relative'}}>
            <LoginToAttend title={t('event.loginToSetAlert')}/>
          </Box>
      )}
      <Paper sx={{width: '480px', maxWidth: '100%', position: 'relative'}}>
        <Box p={2}>
          <AlertsHeader
            event={event}
            switchChecked={switchChecked}
            handleToggle={handleToggle}
            disabled={!canSetAlert()}
          />
          <Typography sx={{mt: 2}} variant="body2">
            {t('alert.description')}
          </Typography>
          <AlertsForm
            event={event}
            disabled={!canSetAlert || !switchChecked}
            tripAlertEntity={tripAlertEntity}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Alerts;
