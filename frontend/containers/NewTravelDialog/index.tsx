import {useState, forwardRef, useMemo} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import {Box, Divider} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {useTranslation} from 'next-i18next';
import PhoneInput from '../../components/PhoneInput';
import PlaceInput from '../PlaceInput';
import useEventStore from '../../stores/useEventStore';
import useActions from './useActions';
import FAQLink from './FAQLink';
import {VehicleEntity} from '../../generated/graphql';

interface Props {
  selectedVehicle: VehicleEntity;
  opened: boolean;
  toggle: (opts: {opened: boolean}) => void;
}

const NewTravelDialog = ({selectedVehicle, opened, toggle}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const event = useEventStore(s => s.event);
  const {createTravel} = useActions({event});

  const dateMoment = useMemo(
    () => (event?.date ? moment(event.date) : null),
    [event?.date]
  );

  // States
  const [name, setName] = useState(selectedVehicle?.attributes.name || '');
  const [seats, setSeats] = useState(selectedVehicle?.attributes.seats || 4);
  const [meeting, setMeeting] = useState('');
  const [meeting_latitude, setMeetingLatitude] = useState(null);
  const [meeting_longitude, setMeetingLongitude] = useState(null);
  const [date, setDate] = useState(dateMoment);
  const [time, setTime] = useState(dateMoment);
  const [phone, setPhone] = useState(
    selectedVehicle?.attributes.phone_number || ''
  );
  const [phoneCountry, setPhoneCountry] = useState(
    selectedVehicle?.attributes.phoneCountry || ''
  );
  const [phoneError, setPhoneError] = useState(false);
  const [details, setDetails] = useState('');
  const [dateError, setDateError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [isTitleEmpty, setIsTitleEmpty] = useState(true);

  const canCreate = !!name && !!seats && !phoneError && phone;

  const clearState = () => {
    setName('');
    setSeats(4);
    setMeeting('');
    setMeetingLatitude(null);
    setMeetingLongitude(null);
    setDate(moment());
    setPhone('');
    setPhoneCountry('');
    setDetails('');
  };

  const onCreate = async e => {
    if (e.preventDefault) e.preventDefault();

    if (!date) {
      setDateError(true);
      return;
    } else {
      setDateError(false);
    }

    if (!name.trim()) {
      setTitleError(true);
      return;
    } else {
      setTitleError(false);
    }

    const travel = {
      meeting,
      meeting_latitude,
      meeting_longitude,
      details,
      seats,
      vehicleName: name,
      phone_number: phone,
      phoneCountry: phoneCountry,
      departureDate: date ? moment(date).format('YYYY-MM-DD') : '',
      departureTime: time ? moment(time).format('HH:mm') : '',
      event: event.id,
    };
    const createVehicle = !selectedVehicle;

    await createTravel(travel, createVehicle);
    toggle({opened: false});

    clearState();
  };

  const halfWidthFieldSx = {
    margin: `0 ${theme.spacing(1.5)}`,
    width: `calc(50% - ${theme.spacing(3)})`,

    '& > .MuiFormLabel-root': {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '100%',
      overflow: 'hidden',
    },
  };

  const handleTitleChange = e => {
    const inputValue = e.target.value;
    setName(inputValue);
    setIsTitleEmpty(inputValue.trim() === '');
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={opened}
      onClose={() => {
        toggle({opened: false});
        clearState();
      }}
      TransitionComponent={Transition}
    >
      <form onSubmit={onCreate}>
        <DialogTitle sx={{paddingBottom: 0}}>
          {t('travel.creation.title')}
        </DialogTitle>
        <DialogContent sx={{padding: `${theme.spacing(2)} 0`}}>
          <Typography
            sx={{...addSpacing(theme, 1), paddingBottom: theme.spacing(1.5)}}
          >
            {t('travel.creation.car.title')}
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            sx={{...addSpacing(theme, 1), paddingBottom: theme.spacing(1)}}
            label={t('travel.creation.name')}
            fullWidth
            value={name}
            onChange={handleTitleChange}
            name="name"
            id="NewTravelName"
            required
            error={titleError}
            helperText={
              isTitleEmpty ? t('travel.creation.travel.titleHelper') : ''
            }
            FormHelperTextProps={{sx: {color: 'warning.main'}}}
          />

          <PhoneInput
            value={phone}
            onChange={({phone, country, error}) => {
              setPhone(phone);
              setPhoneCountry(country);
              setPhoneError(error);
            }}
            label={t('travel.creation.phone')}
            name="phone"
            variant="outlined"
            size="small"
            sx={{...addSpacing(theme, 1), paddingBottom: theme.spacing(1)}}
            helperText={
              <Typography variant="caption">
                <FAQLink
                  link={t('travel.creation.phoneHelper.faq')}
                  text={t('travel.creation.phoneHelper.why')}
                />
              </Typography>
            }
            id="NewTravelPhone"
          />
          <Box sx={addSpacing(theme, 1)}>
            <Typography variant="caption">
              {t('travel.creation.seats')}
            </Typography>
            <Slider
              size="small"
              value={seats}
              onChange={(e, value) => setSeats(value)}
              step={1}
              marks={MARKS}
              min={1}
              max={MARKS.length}
              valueLabelDisplay="auto"
              id="NewTravelSeats"
            />
          </Box>
          <Divider
            sx={{
              margin: `${theme.spacing(2)} 0`,
            }}
          />
          <Typography
            sx={{...addSpacing(theme, 1), paddingBottom: theme.spacing(1.5)}}
          >
            {t('travel.creation.travel.title')}
          </Typography>
          <Box sx={addSpacing(theme, 0.5)} pb={1}>
            <DatePicker
              slotProps={{
                textField: {
                  variant: 'outlined',
                  size: 'small',
                  helperText: dateError
                    ? t('travel.creation.travel.dateHelper')
                    : '',
                  error: dateError,
                  FormHelperTextProps: {sx: {color: 'warning.main'}},
                  sx: halfWidthFieldSx,
                },
              }}
              format="DD/MM/YYYY"
              label={t('travel.creation.date')}
              value={date}
              onChange={setDate}
              autoFocus
            />
            <TimePicker
              slotProps={{
                textField: {
                  variant: 'outlined',
                  size: 'small',
                  helperText: '',
                  sx: halfWidthFieldSx,
                },
              }}
              label={t('travel.creation.time')}
              value={time}
              onChange={setTime}
              ampm={false}
              minutesStep={5}
            />
          </Box>
          <PlaceInput
            label={t('travel.creation.meeting')}
            textFieldProps={{
              variant: 'outlined',
              size: 'small',
              sx: {...addSpacing(theme, 1), paddingBottom: theme.spacing(1)},
            }}
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
            variant="outlined"
            size="small"
            sx={{...addSpacing(theme, 1), paddingBottom: theme.spacing(1)}}
            label={t('travel.creation.notes')}
            fullWidth
            multiline
            maxRows={4}
            inputProps={{maxLength: 250}}
            helperText={`${details.length}/250`}
            value={details}
            onChange={e => setDetails(e.target.value)}
            name="details"
            id="NewTravelDetails"
          />
        </DialogContent>
        <DialogActions
          sx={{
            paddingTop: 0,
          }}
        >
          <Button
            color="primary"
            id="NewTravelCancel"
            onClick={() => toggle({opened: false})}
            tabIndex={-1}
          >
            {t('generic.cancel')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={!canCreate}
            aria-disabled={!canCreate}
            id="NewTravelSubmit"
          >
            {t('travel.creation.submit')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MARKS = [1, 2, 3, 4, 5, 6, 7, 8].map(value => ({
  value,
  label: value,
}));

const addSpacing = (theme, ratio) => ({
  margin: `0 ${theme.spacing(3 * ratio)}`,
  width: `calc(100% - ${theme.spacing(6 * ratio)})`,
});

export default NewTravelDialog;
