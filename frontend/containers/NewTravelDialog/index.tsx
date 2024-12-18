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
import {Box, Divider, Stack} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {useTranslation} from 'next-i18next';
import PhoneInput from '../../components/PhoneInput';
import PlaceInput from '../PlaceInput';
import useEventStore from '../../stores/useEventStore';
import useActions from './useActions';
import FAQLink from './FAQLink';
import {useSession} from 'next-auth/react';

interface Props {
  opened: boolean;
  toggle: (opts: {opened: boolean}) => void;
}

const NewTravelDialog = ({opened, toggle}: Props) => {
  const {t} = useTranslation();
  const event = useEventStore(s => s.event);
  const {createTravel} = useActions({event});
  const session = useSession();
  const profile = session?.data?.profile;
  const dateMoment = useMemo(
    () => (event?.date ? moment(event.date) : null),
    [event?.date]
  );

  // States
  const [firstname, setFirstname] = useState(profile?.firstName || '');
  const [lastname, setLastname] = useState(profile?.lastName || '');
  const [seats, setSeats] = useState(4);
  const [meeting, setMeeting] = useState('');
  const [meeting_latitude, setMeetingLatitude] = useState(null);
  const [meeting_longitude, setMeetingLongitude] = useState(null);
  const [date, setDate] = useState(dateMoment);
  const [time, setTime] = useState(dateMoment);
  const [phone, setPhone] = useState('');
  const [phoneCountry, setPhoneCountry] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [details, setDetails] = useState('');

  const canCreate =
    !!firstname?.trim() &&
    !!lastname?.trim() &&
    !!seats &&
    !phoneError &&
    phone;

  const clearState = () => {
    setSeats(4);
    setMeeting('');
    setMeetingLatitude(null);
    setMeetingLongitude(null);
    setDate(moment());
    setDetails('');
  };

  const onCreate = async e => {
    if (e.preventDefault) e.preventDefault();

    const travel = {
      firstname,
      lastname,
      meeting,
      meeting_latitude,
      meeting_longitude,
      details,
      seats,
      phone_number: phone,
      phoneCountry: phoneCountry,
      departureDate: date ? moment(date).format('YYYY-MM-DD') : '',
      departureTime: time ? moment(time).format('HH:mm') : '',
      event: event.id,
    };

    await createTravel(travel);
    toggle({opened: false});

    clearState();
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
        <DialogContent sx={{px: 0}}>
          <Stack px={3} py={2} spacing={2}>
            <Typography>{t('travel.creation.car.title')}</Typography>
            <Box display="flex" gap={2}>
              <TextField
                fullWidth
                required
                variant="outlined"
                size="small"
                label={t`profile.firstName`}
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
                name="firstname"
                id="NewTravelFirstname"
                error={!firstname?.trim()}
              />
              <TextField
                fullWidth
                required
                variant="outlined"
                size="small"
                label={t`profile.lastName`}
                value={lastname}
                onChange={e => setLastname(e.target.value)}
                name="lastname"
                id="NewTravelLastname"
                error={!lastname?.trim()}
              />
            </Box>
            <PhoneInput
              required
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
            <Box>
              <Typography variant="caption">
                {t('travel.creation.seats')}
              </Typography>
              <Slider
                size="small"
                value={seats}
                onChange={(e, value) => setSeats(value as number)}
                step={1}
                marks={MARKS}
                min={1}
                max={MARKS.length}
                valueLabelDisplay="auto"
                id="NewTravelSeats"
              />
            </Box>
          </Stack>
          <Divider />
          <Stack px={3} pt={2} spacing={2}>
            <Typography>{t('travel.creation.travel.title')}</Typography>
            <Box display="flex" gap={2}>
              <DatePicker
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    size: 'small',
                    helperText: !date
                      ? t('travel.creation.travel.dateHelper')
                      : '',
                    error: !date,
                    FormHelperTextProps: {sx: {color: 'warning.main'}},
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
              label={t(
                event?.isReturnEvent ? 'travel.destination' : 'travel.meeting'
              )}
              textFieldProps={{
                variant: 'outlined',
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
          </Stack>
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

export default NewTravelDialog;
