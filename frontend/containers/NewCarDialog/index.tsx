import {useState, forwardRef, useMemo} from 'react';
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
import useToastsStore from '../../stores/useToastStore';
import useAddToEvents from '../../hooks/useAddToEvents';
import {useCreateCarMutation} from '../../generated/graphql';

const NewCarDialog = ({open, toggle}) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const addToast = useToastsStore(s => s.addToast);
  const {addToEvent} = useAddToEvents();
  const event = useEventStore(s => s.event);
  const [createCar] = useCreateCarMutation({refetchQueries: ['eventByUUID']});
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

  const onCreate = async e => {
    if (e.preventDefault) e.preventDefault();
    try {
      const departure = moment(
        `${moment(date).format('YYYY-MM-DD')} ${moment(time).format('HH:mm')}`,
        'YYYY-MM-DD HH:mm'
      ).toISOString();
      await createCar({
        variables: {
          car: {
            name,
            seats,
            meeting,
            departure,
            phone_number: phone,
            details,
            event: event.id,
          },
        },
      });
      addToEvent(event.id);
      addToast(t('car.creation.created'));
      toggle();

      // Clear states
      setName('');
      setSeats(4);
      setMeeting('');
      setDate(moment());
      setPhone('');
      setDetails('');
    } catch (error) {
      console.error(error);
      addToast(t('car.errors.cant_create'));
    }
    return false;
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={toggle}
      TransitionComponent={Transition}
    >
      <form onSubmit={onCreate}>
        <DialogTitle>{t('car.creation.title')}</DialogTitle>
        <DialogContent>
          <DatePicker
            label={t('car.creation.date')}
            fullWidth
            helperText=" "
            value={date}
            onChange={setDate}
            format="DD/MM/YYYY"
            cancelLabel={t('generic.cancel')}
            autoFocus
            id="NewCarDateTime"
          />
          <TimePicker
            label={t('car.creation.time')}
            fullWidth
            helperText=" "
            value={time}
            onChange={setTime}
            cancelLabel={t('generic.cancel')}
            ampm={false}
            minutesStep={5}
            id="NewCarTime"
          />
          <TextField
            label={t('car.creation.name')}
            fullWidth
            helperText=" "
            value={name}
            onChange={e => setName(e.target.value)}
            name="name"
            id="NewCarName"
          />
          <TextField
            label={t('car.creation.phone')}
            fullWidth
            helperText=" "
            value={phone}
            onChange={e => setPhone(e.target.value)}
            name="phone"
            id="NewCarPhone"
          />
          <TextField
            label={t('car.creation.meeting')}
            fullWidth
            multiline
            rowsMax={4}
            inputProps={{maxLength: 250}}
            helperText={`${meeting.length}/250`}
            value={meeting}
            onChange={e => setMeeting(e.target.value)}
            name="meeting"
            id="NewCarMeeting"
          />
          <TextField
            label={t('car.creation.notes')}
            fullWidth
            multiline
            rowsMax={4}
            inputProps={{maxLength: 250}}
            helperText={`${details.length}/250`}
            value={details}
            onChange={e => setDetails(e.target.value)}
            name="details"
            id="NewCarDetails"
          />
          <div className={classes.slider}>
            <Typography variant="caption">{t('car.creation.seats')}</Typography>
            <Slider
              value={seats}
              onChange={(e, value) => setSeats(value)}
              step={1}
              marks={MARKS}
              min={1}
              max={MARKS.length}
              valueLabelDisplay="auto"
              id="NewCarSeats"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            id="NewCarCancel"
            onClick={toggle}
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
            id="NewCarSubmit"
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

export default NewCarDialog;
