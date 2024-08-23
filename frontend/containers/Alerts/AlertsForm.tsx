import React, {useState} from 'react';
import {
  Button,
  FormControl,
  TextField,
  InputAdornment,
  Stack,
} from '@mui/material';
import {useTranslation} from 'next-i18next';
import {EventEntity, TripAlertEntity} from '../../generated/graphql';
import PlaceInput from '../PlaceInput';
import useCreateTripAlert from './useCreateTripAlert';

interface Props {
  event: EventEntity;
  tripAlertEntity: TripAlertEntity;
  disabled: boolean;
}

const AlertsForm = ({event, tripAlertEntity, disabled}: Props) => {
  const {t} = useTranslation();

  const [address, setAddress] = useState(
    tripAlertEntity?.attributes.address || ''
  );
  const [longitude, setLongitude] = useState(
    tripAlertEntity?.attributes.longitude || 0
  );
  const [latitude, setLatitude] = useState(
    tripAlertEntity?.attributes.latitude || 0
  );
  const [radius, setRadius] = useState(tripAlertEntity?.attributes.radius || 0);
  const [formModified, setFormModified] = useState(false);

  const handleRadiusChange = e => {
    setRadius(Number(e.target.value));
    setFormModified(true);
  };

  const disabledButton = disabled || !formModified;
  const eventId = event.id;

  const handleCreateTripAlert = useCreateTripAlert();
  const handleCreateAlert = async () => {
    await handleCreateTripAlert({
      eventId,
      enabled: !disabled,
      latitude: address ? latitude : 0,
      longitude: address ? longitude : 0,
      address,
      radius,
    });
    setFormModified(false);
  };

  return (
    <Stack display="flex" direction="column" spacing={2}>
      <FormControl>
        <PlaceInput
          label={t('alert.location.label')}
          place={address}
          latitude={latitude}
          longitude={longitude}
          onSelect={({place, latitude, longitude}) => {
            setAddress(place);
            setLatitude(latitude);
            setLongitude(longitude);
            setFormModified(true);
          }}
          disabled={disabled}
        />
      </FormControl>
      <TextField
        id="radius"
        label={t('alert.radius.label')}
        InputProps={{
          endAdornment: <InputAdornment position="end">km</InputAdornment>,
        }}
        variant="standard"
        defaultValue={radius}
        disabled={disabled}
        onChange={handleRadiusChange}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={disabledButton}
        onClick={handleCreateAlert}
      >
        {t('alert.button.label')}
      </Button>
    </Stack>
  );
};

export default AlertsForm;
