import React, {useState, useReducer, useCallback, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import {makeStyles} from '@material-ui/core/styles';
import {DateTimePicker} from '@material-ui/pickers';
import {useTranslation} from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import {useStrapi} from 'strapi-react-context';
import {useToast} from '../../contexts/Toast';
import {useEvent} from '../../contexts/Event';
import RemoveDialog from '../RemoveDialog';

const HeaderEditing = ({car, toggleEditing}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const strapi = useStrapi();
  const {event} = useEvent();
  const {addToast} = useToast();
  const [removing, toggleRemoving] = useReducer(i => !i, false);

  // States
  const [name, setName] = useState(car?.name ?? '');
  const [seats, setSeats] = useState(car?.seats ?? 4);
  const [meeting, setMeeting] = useState(car?.meeting ?? '');
  const [date, setDate] = useState(
    car?.departure ? moment(car.departure) : moment()
  );
  const [phone, setPhone] = useState(car ? car['phone_number'] : '');
  const [details, setDetails] = useState(car?.details ?? '');

  // Click on ESQ should close the form
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

  const onSave = async evt => {
    if (evt.preventDefault) evt.preventDefault();
    try {
      // If new seats count is under current passengers count, put excedent in event waiting list
      if (!!car.passengers && car.passengers.length > seats) {
        const lostPassengers = car.passengers.slice(seats);
        if (lostPassengers.length > 0)
          await strapi.services.events.update(event.id, {
            waiting_list: [...(event.waiting_list ?? []), ...lostPassengers],
          });
      }
      // Update car
      await strapi.services.cars.update(car.id, {
        name,
        seats,
        meeting,
        departure: date.toISOString(),
        phone_number: phone,
        details,
        passengers: car.passengers ? car.passengers.slice(0, seats) : [],
      });
      toggleEditing();
    } catch (error) {
      console.error(error);
      addToast('car.errors.cant_update');
    }
    return false;
  };

  const onRemove = async () => {
    try {
      // Put passengers in event waiting list (if any)
      if (Array.isArray(car?.passengers) && car.passengers.length > 0)
        await strapi.services.events.update(event.id, {
          waiting_list: [...(event.waiting_list ?? []), ...car.passengers],
        });
      // Remove car
      await strapi.services.cars.remove(car.id);
      addToast(t('car.actions.removed'));
      toggleEditing();
    } catch (error) {
      console.error(error);
      addToast('car.errors.cant_remove');
    }
  };

  return (
    <div className={classes.header}>
      <form onSubmit={onSave}>
        <IconButton
          size="small"
          color="primary"
          type="submit"
          className={classes.editBtn}
        >
          <Icon>done</Icon>
        </IconButton>
        <DateTimePicker
          label={t('event.creation.date')}
          value={date}
          onChange={setDate}
          className={classes.textField}
          fullWidth
          format="LLLL"
          disablePast
          id="EditCarDateTime"
          name="date"
          cancelLabel={t('generic.cancel')}
        />
        <TextField
          className={classes.textField}
          label={t('car.creation.name')}
          fullWidth
          autoFocus
          margin="dense"
          value={name}
          onChange={e => setName(e.target.value)}
          id="EditCarName"
          name="name"
        />
        <TextField
          className={classes.textField}
          label={t('car.creation.phone')}
          fullWidth
          autoFocus
          margin="dense"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          id="EditCarPhone"
          name="phone"
        />
        <TextField
          className={classes.textField}
          label={t('car.creation.meeting')}
          fullWidth
          margin="dense"
          multiline
          rows={2}
          value={meeting}
          onChange={e => setMeeting(e.target.value)}
          id="EditCarMeeting"
          name="meeting"
        />
        <TextField
          className={classes.textField}
          label={t('car.creation.notes')}
          fullWidth
          margin="dense"
          inputProps={{maxLength: 250}}
          helperText={`${details.length}/250`}
          multiline
          rows={2}
          value={details}
          onChange={e => setDetails(e.target.value)}
          id="EditCarDetails"
          name="details"
        />
        <div className={classes.slider}>
          <Typography variant="caption">{t('car.creation.seats')}</Typography>
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
            id="EditCarSeats"
          />
        </div>
      </form>
      <div className={classes.actions}>
        <Button
          variant="outlined"
          color="primary"
          onClick={onSave}
          id="CarSave"
        >
          {t('generic.save')}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={toggleRemoving}
          id="CarRemove"
        >
          {t('generic.remove')}
        </Button>
      </div>
      <RemoveDialog
        text={t('car.actions.remove_alert')}
        open={removing}
        onClose={toggleRemoving}
        onRemove={onRemove}
      />
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  header: {padding: theme.spacing(2)},
  editBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: theme.spacing(1),
    zIndex: theme.zIndex.speedDial,
  },
  section: {
    marginTop: theme.spacing(2),
  },
  slider: {
    marginTop: theme.spacing(2),
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0),
    '& > *:first-child': {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default HeaderEditing;
