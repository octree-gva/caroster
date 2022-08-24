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
import moment, {Moment} from 'moment';
import {useTranslation} from 'react-i18next';
import useEventStore from '../../stores/useEventStore';
import useActions from './useActions';
import {Vehicle} from '../../generated/graphql';
import {Box, Divider} from '@material-ui/core';
import FAQLink from './FAQLink';

interface Props {
  context: {
    vehicle: Vehicle;
    opened: boolean;
  };
  toggle: ({opened: boolean}) => void;
}

const NewTravelDialog = ({context, toggle}: Props) => {
  const {t} = useTranslation();
  const classes = useStyles();
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
        <DialogTitle className={classes.title}>
          {t('travel.creation.title')}
        </DialogTitle>
        <DialogContent className={classes.content}>
          <Typography className={classes.sectionTitle}>
            {t('travel.creation.car.title')}
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            className={classes.field}
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
            className={classes.field}
            label={t('travel.creation.phone')}
            fullWidth
            helperText=" "
            value={phone}
            onChange={e => setPhone(e.target.value)}
            name="phone"
            FormHelperTextProps={{
              component: () => (
                <FAQLink
                  className={classes.faqHelper}
                  link={t('travel.creation.phoneHelper.faq')}
                  text={t('travel.creation.phoneHelper.why')}
                />
              ),
            }}
            id="NewTravelPhone"
          />
          <div className={classes.slider}>
            <Typography variant="caption">
              {t('travel.creation.seats')}
            </Typography>
            <Slider
              value={seats}
              onChange={(e, value) => setSeats(value)}
              step={1}
              marks={MARKS}
              min={1}
              max={MARKS.length}
              valueLabelDisplay="auto"
              id="NewTravelSeats"
            />
          </div>
          <Divider className={classes.divider} />
          <Typography className={classes.sectionTitle}>
            {t('travel.creation.travel.title')}
          </Typography>
          <Box className={classes.halfWidthWrapper}>
            <DatePicker
              className={classes.halfWidthField}
              inputVariant="outlined"
              size="small"
              label={t('travel.creation.date')}
              helperText=" "
              value={date}
              onChange={setDate}
              format="DD/MM/YYYY"
              cancelLabel={t('generic.cancel')}
              autoFocus
              id="NewTravelDateTime"
            />
            <TimePicker
              className={classes.halfWidthField}
              inputVariant="outlined"
              size="small"
              label={t('travel.creation.time')}
              helperText=" "
              value={time}
              onChange={setTime}
              cancelLabel={t('generic.cancel')}
              ampm={false}
              minutesStep={5}
              id="NewTravelTime"
            />
          </Box>
          <TextField
            variant="outlined"
            size="small"
            className={classes.field}
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
            variant="outlined"
            size="small"
            className={classes.field}
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
        </DialogContent>
        <DialogActions className={classes.actions}>
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
  margin: `0 ${theme.spacing(3 * ratio)}px`,
  width: `calc(100% - ${theme.spacing(6 * ratio)}px)`,
});

const useStyles = makeStyles(theme => ({
  title: {
    paddingBottom: 0,
  },
  sectionTitle: {
    ...addSpacing(theme, 1),
    paddingBottom: theme.spacing(1.5),
  },
  content: {
    padding: `${theme.spacing(2)}px 0`,
  },
  faqHelper: {
    fontSize: '12px',
  },
  field: {
    ...addSpacing(theme, 1),
    paddingBottom: theme.spacing(1),
  },
  halfWidthWrapper: {
    ...addSpacing(theme, 0.5),
  },
  halfWidthField: {
    margin: `0 ${theme.spacing(1.5)}px`,
    width: `calc(50% - ${theme.spacing(3)}px)`,

    '& > .MuiFormLabel-root': {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '100%',
      overflow: 'hidden',
    },
  },
  slider: {
    ...addSpacing(theme, 1),
  },
  divider: {
    margin: `${theme.spacing(2)}px 0`,
  },
  actions: {
    paddingTop: 0,
  },
}));

export default NewTravelDialog;
