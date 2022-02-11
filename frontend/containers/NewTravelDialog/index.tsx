import {useState, forwardRef, useMemo, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import {DatePicker, TimePicker} from '@material-ui/pickers';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import useEventStore from '../../stores/useEventStore';
import useActions from './useActions';
import useProfile from '../../hooks/useProfile';

const NewTravelDialog = ({context, toggle}) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const {user} = useProfile();
  const event = useEventStore(s => s.event);
  const actions = useActions({event});

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
      date,
      time,
      details,
      vehicle: {
        name,
        seats,
        phone_number: phone,
      },
    };
    if (context.vehicle && user) {
      // The authenticated user choose an existing vehicle and assign it to the travel
      await actions.createTravel({
        ...travel,
        vehicle: context.vehicle,
      });
    } else if (user) {
      // The autenticated user create a vehicle and assign it to the travel
      await actions.createTravel({
        ...travel,
        vehicle: {...travel.vehicle, user: user.id, created_by: user.id},
      });
    } else {
      // The anonymous user create a vehicle and assign it to the travel 
      await actions.createTravel(travel);
    }

    toggle({opened: false});

    // Clear states
    setName('');
    setSeats(4);
    setMeeting('');
    setDate(moment());
    setPhone('');
    setDetails('');
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={context?.opened}
      onClose={() => toggle({opened: false})}
      TransitionComponent={Transition}
    >
      <form onSubmit={onCreate}>
        <DialogTitle>{t('travel.creation.title')}</DialogTitle>
        <DialogContent>
          <DatePicker
            label={t('travel.creation.date')}
            fullWidth
            helperText=" "
            value={date}
            onChange={setDate}
            format="DD/MM/YYYY"
            cancelLabel={t('generic.cancel')}
            autoFocus
            id="NewTravelDateTime"
          />
          <TimePicker
            label={t('travel.creation.time')}
            fullWidth
            helperText=" "
            value={time}
            onChange={setTime}
            cancelLabel={t('generic.cancel')}
            ampm={false}
            minutesStep={5}
            id="NewTravelTime"
          />
          <TextField
            label={t('travel.creation.name')}
            fullWidth
            helperText=" "
            value={name}
            disabled={!!context.vehicle}
            onChange={e => setName(e.target.value)}
            name="name"
            id="NewTravelName"
          />
          <TextField
            label={t('travel.creation.phone')}
            fullWidth
            helperText=" "
            value={phone}
            disabled={!!context.vehicle}
            onChange={e => setPhone(e.target.value)}
            name="phone"
            id="NewTravelPhone"
          />
          <TextField
            label={t('travel.creation.meeting')}
            fullWidth
            multiline
            rowsMax={4}
            inputProps={{maxLength: 250}}
            helperText={`${meeting.length}/250`}
            value={meeting}
            onChange={e => setMeeting(e.target.value)}
            name="meeting"
            id="NewTravelMeeting"
          />
          <TextField
            label={t('travel.creation.notes')}
            fullWidth
            multiline
            rowsMax={4}
            inputProps={{maxLength: 250}}
            helperText={`${details.length}/250`}
            value={details}
            onChange={e => setDetails(e.target.value)}
            name="details"
            id="NewTravelDetails"
          />
          <div className={classes.slider}>
            <Typography variant="caption">
              {t('travel.creation.seats')}
            </Typography>
            <Slider
              value={seats}
              disabled={!!context.vehicle}
              onChange={(e, value) => setSeats(value)}
              step={1}
              marks={MARKS}
              min={1}
              max={MARKS.length}
              valueLabelDisplay="auto"
              id="NewTravelSeats"
            />
          </div>
        </DialogContent>
        <DialogActions>
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
            {t('generic.create')}
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

const useStyles = makeStyles(theme => ({
  slider: {
    marginTop: theme.spacing(2),
  },
}));

export default NewTravelDialog;
