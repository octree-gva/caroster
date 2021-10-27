import {useState, useReducer, useCallback, useEffect, useMemo} from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import RemoveDialog from '../RemoveDialog';
import useToastStore from '../../stores/useToastStore';
import useEventStore from '../../stores/useEventStore';
import {
  useUpdateEventMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} from '../../generated/graphql';

const HeaderEditing = ({car, toggleEditing}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const event = useEventStore(s => s.event);
  const addToast = useToastStore(s => s.addToast);
  const [updateEvent] = useUpdateEventMutation();
  const [updateCar] = useUpdateCarMutation();
  const [deleteCar] = useDeleteCarMutation({refetchQueries: ['eventByUUID']});
  const [removing, toggleRemoving] = useReducer(i => !i, false);
  const dateMoment = useMemo(() => {
    if (!car?.departure) return moment();
    else return moment(car.departure);
  }, [car?.departure]);

  // States
  const [name, setName] = useState(car?.name ?? '');
  const [seats, setSeats] = useState(car?.seats ?? 4);
  const [meeting, setMeeting] = useState(car?.meeting ?? '');
  const [date, setDate] = useState(dateMoment.format('YYYY-MM-DD'));
  const [time, setTime] = useState(dateMoment.format('HH:mm'));
  const [phone, setPhone] = useState(car ? car['phone_number'] : '');
  const [details, setDetails] = useState(car?.details ?? '');

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

  const onSave = async evt => {
    if (evt.preventDefault) evt.preventDefault();
    try {
      // If new seats count is under current passengers count, put excedent in event waiting list
      if (!!car.passengers && car.passengers.length > seats) {
        const lostPassengers = car.passengers.slice(seats);
        if (lostPassengers.length > 0)
          await updateEvent({
            variables: {
              uuid: event.uuid,
              eventUpdate: {
                waitingList: formatPassengers([
                  ...(event.waitingList || []),
                  ...lostPassengers.map(({name}) => ({name})),
                ]),
              },
            },
            refetchQueries: ['eventByUUID'],
          });
      }
      const departure = moment(
        `${date} ${time}`,
        'YYYY-MM-DD HH:mm'
      ).toISOString();
      await updateCar({
        variables: {
          id: car.id,
          carUpdate: {
            name,
            seats,
            meeting,
            departure,
            phone_number: phone,
            details,
            passengers: formatPassengers(car.passengers, seats),
          },
        },
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
        await updateEvent({
          variables: {
            uuid: event.uuid,
            eventUpdate: {
              waitingList: formatPassengers([
                ...(event.waitingList || []),
                ...car.passengers.map(({name}) => ({name})),
              ]),
            },
          },
          refetchQueries: ['eventByUUID'],
        });
      await deleteCar({
        variables: {
          id: car.id,
        },
      });
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
          className={classes.edit}
        >
          <Icon>done</Icon>
        </IconButton>
        <TextField
          label={t('car.creation.date')}
          value={date}
          onChange={e => setDate(e.target.value)}
          className={classes.picker}
          fullWidth
          id="NewCarDate"
          name="date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label={t('car.creation.time')}
          value={time}
          onChange={e => setTime(e.target.value)}
          className={classes.picker}
          fullWidth
          id="NewCarTime"
          name="time"
          type="time"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
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

const formatPassengers = (passengers = [], seats: number = 1000) => {
  if (!passengers) return [];

  return passengers
    .slice(0, seats)
    .map(({__typename, ...passenger}) => passenger);
};

const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(2),
  },
  edit: {
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
  picker: {
    marginBottom: theme.spacing(2),
  },
}));

export default HeaderEditing;
