import {useState, useReducer, useCallback, useEffect, useMemo} from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import moment, {Moment} from 'moment';
import {useTheme} from '@mui/material/styles';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {useTranslation} from 'react-i18next';
import RemoveDialog from '../RemoveDialog';
import useActions from './useActions';
import Box from '@mui/material/Box';
import PlaceInput from '../PlaceInput';

const HeaderEditing = ({travel, toggleEditing}) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const actions = useActions({travel});
  const [removing, toggleRemoving] = useReducer(i => !i, false);
  const dateMoment = useMemo(
    () => (travel?.departure ? moment(travel.departure) : null),
    [travel?.departure]
  );

  // States
  const [name, setName] = useState(travel?.vehicleName ?? '');
  const [seats, setSeats] = useState(travel?.seats ?? 4);
  const [meeting, setMeeting] = useState(travel?.meeting ?? '');
  const [meeting_latitude, setMeetingLatitude] = useState(null);
  const [meeting_longitude, setMeetingLongitude] = useState(null);
  const [date, setDate] = useState(dateMoment);
  const [time, setTime] = useState(dateMoment);
  const [phone, setPhone] = useState(travel?.phone_number ?? '');
  const [details, setDetails] = useState(travel?.details ?? '');

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
      departure: formatDate(date, time),
    };
    await actions.updateTravel(travelUpdate);
    toggleEditing();
  };

  const onRemove = async () => {
    await actions.removeTravel();
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
          autoFocus
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
            onSelect={({location, place}) => {
              setMeeting(place);
              setMeetingLatitude(location[1]);
              setMeetingLongitude(location[0]);
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
        text={t('travel.actions.remove_alert')}
        open={removing}
        onClose={toggleRemoving}
        onRemove={onRemove}
      />
    </Box>
  );
};

const formatDate = (date: Moment, time: Moment) => {
  return moment(
    `${moment(date).format('YYYY-MM-DD')} ${moment(time).format('HH:mm')}`,
    'YYYY-MM-DD HH:mm'
  ).toISOString();
};

export default HeaderEditing;
