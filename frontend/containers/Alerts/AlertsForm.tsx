import {Button, FormControl, TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import React, {useState} from 'react';
import PlaceInput from '../PlaceInput';
import {t} from 'i18next';
import {
  EventEntity,
  TripAlertEntity,
  useSetTripAlertMutation,
} from '../../generated/graphql';
import useToastStore from '../../stores/useToastStore';

interface Props {
  event: EventEntity;
  tripAlertEntity: TripAlertEntity;
  disabled: boolean;
}

const AlertsForm = ({event, tripAlertEntity, disabled}: Props) => {
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
  const handleRadiusChange = e => setRadius(Number(e.target.value));
  const addToast = useToastStore(s => s.addToast);
  const [setTripAlertMutation] = useSetTripAlertMutation();

  const handleCreateTripAlert = async () => {
    try {
      await setTripAlertMutation({
        variables: {
          eventId: event.id,
          enabled: !disabled,
          latitude: address ? latitude : 0,
          longitude: address ? longitude : 0,
          address: address,
          radius: radius,
        },
      });
      addToast(t('alert.create'));
    } catch (error) {
      addToast(t('alert.errors.cant_create'));
    }
  };

  return (
    <Stack display="flex" direction="column" spacing={2}>
      <FormControl>
        <PlaceInput
          label={t('alert.location.label')}
          textFieldProps={{sx: {mt: 2}}}
          place={address}
          latitude={latitude}
          longitude={longitude}
          onSelect={({place, latitude, longitude}) => {
            setAddress(place);
            setLatitude(latitude);
            setLongitude(longitude);
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
        onClick={handleCreateTripAlert}
      >
        {t('alert.button.label')}
      </Button>
    </Stack>
  );
};

export default AlertsForm;
