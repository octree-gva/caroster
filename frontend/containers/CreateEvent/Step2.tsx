import {useState} from 'react';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import {useRouter} from 'next/router';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {useTranslation} from 'react-i18next';
import useToastStore from '../../stores/useToastStore';
import AddressAutofill from '../AddressAutofill';

const Step2 = ({event, addToEvent, createEvent}) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const addToast = useToastStore(s => s.addToast);

  // States
  const [date, setDate] = useState(null);
  const [address, setAddress] = useState(event.address ?? '');
  const [longitude, setLongitude] = useState(event.longitude);
  const [latitude, setLatitude] = useState(event.latitude);
  const [description, setDescription] = useState(event.description ?? '');
  const [loading, setLoading] = useState(false);

  const onCreate = async evt => {
    if (evt.preventDefault) evt.preventDefault();
    if (loading) return;
    setLoading(true);
    const eventData = {
      date: !date ? null : moment(date).format('YYYY-MM-DD'),
      address,
      longitude,
      latitude,
      description,
    };
    addToEvent(eventData);
    const result = await createEvent(eventData);
    if (!result) addToast(t('event.errors.cant_create'));
    else router.push(`/e/${result.uuid}`);
    setLoading(false);
    return;
  };

  return (
    <Box component="form" onSubmit={onCreate}>
      <DatePicker
        slotProps={{textField: {fullWidth: true, variant: 'standard'}}}
        format="DD/MM/YYYY"
        label={t('event.creation.date')}
        value={date}
        onChange={setDate}
      />
      <AddressAutofill
        label={t('event.creation.address')}
        textFieldProps={{sx: {mt: 2}}}
        address={address}
        onSelect={({location, address}) => {
          setAddress(address);
          setLatitude(location[1]);
          setLongitude(location[0]);
        }}
      />
      <TextField
        label={t('event.creation.description')}
        fullWidth
        multiline
        sx={{mt: 2}}
        variant="standard"
        maxRows={4}
        inputProps={{maxLength: 250}}
        helperText={
          description.length === 0
            ? t('event.creation.description_helper')
            : `${description.length}/250`
        }
        value={description}
        onChange={e => setDescription(e.target.value)}
        name="address"
      />
      <Button
        disabled={loading}
        sx={{marginTop: theme.spacing(2)}}
        variant="contained"
        color="primary"
        fullWidth
        type="submit"
        id="NewEventSubmit"
      >
        {loading ? (
          <CircularProgress size={20} color="primary" />
        ) : (
          t('generic.create')
        )}
      </Button>
    </Box>
  );
};

export default Step2;
