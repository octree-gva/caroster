import React from 'react';
import {Box, FormControlLabel, Typography} from '@mui/material';
import Toggle from '../../components/Toggle/index';
import {useTranslation} from 'next-i18next';
import {EventEntity} from '../../generated/graphql';
import useCreateTripAlert from './useCreateTripAlert';

interface Props {
  event: EventEntity;
  switchChecked: boolean;
  disabled: boolean;
  handleToggle: () => void;
}

const AlertsHeader = ({
  event,
  switchChecked,
  disabled,
  handleToggle,
}: Props) => {
  const {t} = useTranslation();
  const handleCreateTripAlert = useCreateTripAlert();

  const eventId = event.id;

  const handleToggleClick = async () => {
    if (!disabled) {
      await handleCreateTripAlert({
        eventId,
        enabled: !switchChecked,
      });
      handleToggle();
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="h5">{t('alert.title')}</Typography>
      <FormControlLabel
        control={
          <Toggle
            activate={handleToggleClick}
            checked={switchChecked}
            disabled={disabled}
          />
        }
        label=""
        sx={{m: 0}}
      />
    </Box>
  );
};

export default AlertsHeader;
