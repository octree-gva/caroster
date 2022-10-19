import {useState, forwardRef, useMemo, useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import {Box, Divider} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import moment, {Moment} from 'moment';
import {useTranslation} from 'react-i18next';
import useEventStore from '../../stores/useEventStore';
import useActions from './useActions';
import FAQLink from './FAQLink';
import {Vehicle} from '../../generated/graphql';

interface Props {
  context: {
    vehicle: Vehicle;
    opened: boolean;
  };
  toggle: ({opened: boolean}) => void;
}

const NewTravelDialog = ({context, toggle}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();

  const event = useEventStore(s => s.event);
  const {createTravel} = useActions({event});

  const dateMoment = useMemo(() => {
    if (!event?.date) return moment();
    else return moment(event.date);
  }, [event?.date]);

  // States
  const [name, setName] = useState('');
  const [seats, setSeats] = useState(4);
  const [meeting, setMeeting] = useState('');
  const [date, setDate] = useState(dateMoment);
  const [time, setTime] = useState(dateMoment);
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const canCreate = !!name && !!seats;

  const clearState = () => {
    setName('');
    setSeats(4);
    setMeeting('');
    setDate(moment());
    setPhone('');
    setDetails('');
  };

  useEffect(() => {
    if (context.vehicle) {
      setName(context.vehicle.name);
      setSeats(context.vehicle.seats);
      setPhone(context.vehicle.phone_number);
    }
  }, [context.vehicle]);

  const onCreate = async e => {
    if (e.preventDefault) e.preventDefault();

    const travel = {
      meeting,
      details,
      seats,
      vehicleName: name,
      phone_number: phone,
      departure: formatDate(date, time),
      event: event.id,
    };
    const createVehicle = !context.vehicle;

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

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={context?.opened}
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
            helperText=" "
            value={name}
            onChange={e => setName(e.target.value)}
            name="name"
            id="NewTravelName"
          />
          <TextField
            variant="outlined"
            size="small"
            sx={{...addSpacing(theme, 1), paddingBottom: theme.spacing(1)}}
            label={t('travel.creation.phone')}
            fullWidth
            inputProps={{type: 'tel'}}
            helperText=" "
            value={phone}
            onChange={e => setPhone(e.target.value)}
            name="phone"
            FormHelperTextProps={{
              component: () => (
                <Typography variant="caption">
                  <FAQLink
                    sx={{textDecoration: 'none'}}
                    link={t('travel.creation.phoneHelper.faq')}
                    text={t('travel.creation.phoneHelper.why')}
                  />
                </Typography>
              ),
            }}
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
          <Box sx={addSpacing(theme, 0.5)}>
            <DatePicker
              renderInput={props => (
                <TextField
                  {...props}
                  variant="outlined"
                  size="small"
                  helperText=" "
                  sx={halfWidthFieldSx}
                />
              )}
              label={t('travel.creation.date')}
              value={date}
              onChange={setDate}
              autoFocus
            />
            <TimePicker
              renderInput={props => (
                <TextField
                  {...props}
                  variant="outlined"
                  size="small"
                  helperText=" "
                  sx={halfWidthFieldSx}
                />
              )}
              label={t('travel.creation.time')}
              value={time}
              onChange={setTime}
              ampm={false}
              minutesStep={5}
            />
          </Box>
          <TextField
            variant="outlined"
            size="small"
            sx={{...addSpacing(theme, 1), paddingBottom: theme.spacing(1)}}
            label={t('travel.creation.meeting')}
            fullWidth
            multiline
            maxRows={4}
            inputProps={{maxLength: 250}}
            helperText={`${meeting.length}/250`}
            value={meeting}
            onChange={e => setMeeting(e.target.value)}
            name="meeting"
            id="NewTravelMeeting"
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

const formatDate = (date: Moment, time: Moment) => {
  return moment(
    `${moment(date).format('YYYY-MM-DD')} ${moment(time).format('HH:mm')}`,
    'YYYY-MM-DD HH:mm'
  ).toISOString();
};

const MARKS = [1, 2, 3, 4, 5, 6, 7, 8].map(value => ({
  value,
  label: value,
}));

const addSpacing = (theme, ratio) => ({
  margin: `0 ${theme.spacing(3 * ratio)}`,
  width: `calc(100% - ${theme.spacing(6 * ratio)})`,
});

export default NewTravelDialog;
