import {useState, useReducer, useCallback, useEffect, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import {DatePicker, TimePicker} from '@material-ui/pickers';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import useToastStore from '../../stores/useToastStore';
import useEventStore from '../../stores/useEventStore';
import RemoveDialog from '../RemoveDialog';
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
  const [date, setDate] = useState(dateMoment);
  const [time, setTime] = useState(dateMoment);
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
        `${moment(date).format('YYYY-MM-DD')} ${moment(time).format('HH:mm')}`,
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
        <DatePicker
          label={t('car.creation.date')}
          fullWidth
          helperText=" "
          value={date}
          onChange={setDate}
          format="DD/MM/YYYY"
          cancelLabel={t('generic.cancel')}
          autoFocus
          id="NewCarDate"
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
          id="EditCarName"
        />
        <TextField
          label={t('car.creation.phone')}
          fullWidth
          helperText=" "
          value={phone}
          onChange={e => setPhone(e.target.value)}
          name="phone"
          id="EditCarPhone"
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
          id="EditCarMeeting"
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
          id="EditCarDetails"
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
}));

export default HeaderEditing;
