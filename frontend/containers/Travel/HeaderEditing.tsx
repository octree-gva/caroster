import {useState, useReducer, useCallback, useEffect, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import {DatePicker, TimePicker} from '@material-ui/pickers';
import moment, {Moment} from 'moment';
import {useTranslation} from 'react-i18next';
import RemoveDialog from '../RemoveDialog';
import useActions from './useActions';

const HeaderEditing = ({travel, toggleEditing}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const actions = useActions({travel});
  const [removing, toggleRemoving] = useReducer(i => !i, false);
  const dateMoment = useMemo(
    () => (travel?.departure ? moment(travel.departure) : moment()),
    [travel?.departure]
  );

  // States
  const [name, setName] = useState(travel?.vehicleName ?? '');
  const [seats, setSeats] = useState(travel?.seats ?? 4);
  const [meeting, setMeeting] = useState(travel?.meeting ?? '');
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
          label={t('travel.creation.date')}
          fullWidth
          helperText=" "
          value={date}
          onChange={setDate}
          format="DD/MM/YYYY"
          cancelLabel={t('generic.cancel')}
          autoFocus
          id="NewTravelDate"
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
          onChange={e => setName(e.target.value)}
          name="name"
          id="EditTravelName"
        />
        <TextField
          label={t('travel.creation.phone')}
          fullWidth
          helperText=" "
          value={phone}
          onChange={e => setPhone(e.target.value)}
          name="phone"
          id="EditTravelPhone"
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
          id="EditTravelMeeting"
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
          id="EditTravelDetails"
        />
        <div className={classes.slider}>
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
        </div>
      </form>
      <div className={classes.actions}>
        <Button
          variant="outlined"
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
      </div>
      <RemoveDialog
        text={t('travel.actions.remove_alert')}
        open={removing}
        onClose={toggleRemoving}
        onRemove={onRemove}
      />
    </div>
  );
};

const formatDate = (date: Moment, time: Moment) => {
  return moment(
    `${moment(date).format('YYYY-MM-DD')} ${moment(time).format('HH:mm')}`,
    'YYYY-MM-DD HH:mm'
  ).toISOString();
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
