import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import {DateTimePicker} from '@material-ui/pickers';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {useStrapi} from 'strapi-react-context';
import {useToast} from '../../contexts/Toast';
import {useEvent} from '../../contexts/Event';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const marks = [1, 2, 3, 4, 5, 6, 7, 8].map(value => ({
  value,
  label: value,
}));

const NewCarDialog = ({open, toggle}) => {
  const strapi = useStrapi();
  const {t} = useTranslation();
  const classes = useStyles();
  const {addToast} = useToast();
  const {event} = useEvent();

  // States
  const [name, setName] = useState('');
  const [seats, setSeats] = useState(4);
  const [meeting, setMeeting] = useState('');
  const [date, setDate] = useState(moment());
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');

  const canCreate = !!name && !!seats;

  const onCreate = async e => {
    if (e.preventDefault) e.preventDefault();
    try {
      await strapi.services.cars.create({
        name,
        seats,
        meeting,
        departure: date.toISOString(),
        phone_number: phone,
        details,
        event: event.id,
      });
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
      open={open}
      TransitionComponent={Transition}
      onClose={toggle}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={onCreate}>
        <DialogTitle>{t('car.creation.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              className={classes.textField}
              label={t('car.creation.name')}
              fullWidth
              autoFocus
              margin="dense"
              value={name}
              onChange={e => setName(e.target.value)}
              id="NewCarName"
              name="name"
            />
            <DateTimePicker
              label={t('event.creation.date')}
              value={date}
              onChange={setDate}
              className={classes.picker}
              fullWidth
              format="LLLL"
              disablePast
              id="NewCarDateTime"
              name="date"
            />
            <Typography variant="caption">{t('car.creation.seats')}</Typography>
            <Slider
              value={seats}
              onChange={(e, value) => setSeats(value)}
              step={1}
              min={1}
              max={marks.length}
              marks={marks}
              valueLabelDisplay="auto"
            />
            <TextField
              className={classes.textField}
              label={t('car.creation.meeting')}
              fullWidth
              margin="dense"
              value={meeting}
              onChange={e => setMeeting(e.target.value)}
              id="NewCarMeeting"
              name="meeting"
            />
            <TextField
              className={classes.textField}
              label={t('car.creation.phone')}
              fullWidth
              margin="dense"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              id="NewCarPhone"
              name="phone"
            />
            <TextField
              className={classes.textField}
              label={t('car.creation.notes')}
              fullWidth
              margin="dense"
              multiline
              rows={4}
              value={details}
              onChange={e => setDetails(e.target.value)}
              id="NewCarDetails"
              name="details"
            />
          </DialogContentText>
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

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: theme.spacing(2),
  },
  picker: {
    marginBottom: theme.spacing(3),
  },
}));

export default NewCarDialog;
