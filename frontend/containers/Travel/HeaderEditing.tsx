import {useState, useReducer, useCallback, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import moment from 'moment';
import {useTheme} from '@mui/material/styles';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {useTranslation} from 'react-i18next';
import RemoveDialog from '../RemoveDialog';
import useActions from './useActions';
import PlaceInput from '../PlaceInput';
import useEventStore from '../../stores/useEventStore';
import {TravelEntity} from '../../generated/graphql';

interface Props {
  travel: TravelEntity;
  toggleEditing: () => void;
}

const HeaderEditing = ({travel, toggleEditing}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const actions = useActions({travel});
  const isCarosterPlus = useEventStore(s =>
    s.event.enabled_modules?.includes('caroster-plus')
  );
  const [removing, toggleRemoving] = useReducer(i => !i, false);

  // States
  const [name, setName] = useState(travel?.attributes.vehicleName ?? '');
  const [seats, setSeats] = useState(travel?.attributes.seats ?? 4);
  const [meeting, setMeeting] = useState(travel?.attributes.meeting ?? '');
  const [meeting_latitude, setMeetingLatitude] = useState(
    travel?.attributes.meeting_latitude
  );
  const [meeting_longitude, setMeetingLongitude] = useState(
    travel?.attributes.meeting_longitude
  );
  const [date, setDate] = useState(
    travel?.attributes.departureDate
      ? moment(travel.attributes.departureDate)
      : null
  );
  const [time, setTime] = useState(
    travel?.attributes.departureTime
      ? moment(travel.attributes.departureTime, 'HH:mm')
      : null
  );
  const [phone, setPhone] = useState(travel?.attributes.phone_number ?? '');
  const [details, setDetails] = useState(travel?.attributes.details ?? '');

  // Click on ESQ closes the form
  const escFunction = useCallback(
    evt => {
      if (evt.keyCode === 27) toggleEditing();
    },
    [toggleEditing]
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const onSave = async event => {
    if (event.preventDefault) event.preventDefault();
    const travelUpdate = {
      meeting,
      meeting_latitude,
      meeting_longitude,
      details,
      seats,
      phone_number: phone,
      vehicleName: name,
      departureDate: date ? moment(date).format('YYYY-MM-DD') : '',
      departureTime: time ? moment(time).format('HH:mm') : '',
    };
    await actions.updateTravel(travelUpdate);
    toggleEditing();
  };

  const onRemove = async () => {
    await actions.removeTravel(
      isCarosterPlus
        ? t`travel.actions.removed.caroster_plus`
        : t`travel.actions.removed`
    );
    toggleEditing();
  };

  return (
    <Box sx={{padding: 2}}>
      <form onSubmit={onSave}>
        <DatePicker
          slotProps={{
            textField: {
              sx: {width: '100%', pb: 2},
            },
          }}
          format="DD/MM/YYYY"
          label={t('travel.creation.date')}
          value={date}
          onChange={setDate}
        />
        <TimePicker
          label={t('travel.creation.time')}
          slotProps={{
            textField: {
              sx: {width: '100%', pb: 2},
            },
          }}
          value={time}
          onChange={setTime}
          ampm={false}
          minutesStep={5}
        />
        <TextField
          label={t('travel.creation.name')}
          fullWidth
          sx={{pb: 2}}
          value={name}
          onChange={e => setName(e.target.value)}
          name="name"
          id="EditTravelName"
        />
        <TextField
          label={t('travel.creation.phone')}
          fullWidth
          sx={{pb: 2}}
          value={phone}
          onChange={e => setPhone(e.target.value)}
          name="phone"
          id="EditTravelPhone"
        />
        <PlaceInput
          label={t('travel.creation.meeting')}
          textFieldProps={{sx: {pb: 2}}}
          place={meeting}
          latitude={meeting_latitude}
          longitude={meeting_longitude}
          onSelect={({place, latitude, longitude}) => {
            setMeeting(place);
            setMeetingLatitude(latitude);
            setMeetingLongitude(longitude);
          }}
        />
        <TextField
          label={t('travel.creation.notes')}
          fullWidth
          sx={{pb: 2}}
          multiline
          maxRows={4}
          inputProps={{maxLength: 250}}
          helperText={`${details.length}/250`}
          value={details}
          onChange={e => setDetails(e.target.value)}
          name="details"
          id="EditTravelDetails"
        />
        <Box sx={{marginTop: theme.spacing(2)}}>
          <Typography variant="caption">
            {t('travel.creation.seats')}
          </Typography>
          <Slider
            value={seats}
            onChange={(e, value) => setSeats(value)}
            step={1}
            marks={[1, 2, 3, 4, 5, 6, 7, 8].map(value => ({
              value,
              label: value,
            }))}
            min={1}
            max={8}
            valueLabelDisplay="auto"
            id="EditTravelSeats"
          />
        </Box>
      </form>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: theme.spacing(2, 0),
          '& > *:first-child': {
            marginBottom: theme.spacing(2),
          },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onSave}
          id="TravelSave"
        >
          {t('generic.save')}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={toggleRemoving}
          id="TravelRemove"
        >
          {t('generic.remove')}
        </Button>
      </Box>
      <RemoveDialog
        text={
          isCarosterPlus
            ? t`travel.actions.remove_alert.caroster_plus`
            : t`travel.actions.remove_alert`
        }
        open={removing}
        onClose={toggleRemoving}
        onRemove={onRemove}
      />
    </Box>
  );
};

export default HeaderEditing;
