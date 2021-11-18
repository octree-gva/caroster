import {useRef} from 'react';
import {makeStyles, createMuiTheme, ThemeProvider} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import Box from '@material-ui/core/Box';
import {DatePicker} from '@material-ui/pickers';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import useEventStore from '../../stores/useEventStore';
import {caroster} from '../../theme';

const EventDetails = ({onShare}) => {
  const {t} = useTranslation();
  const event = useEventStore(s => s.event);
  const setEventUpdate = useEventStore(s => s.setEventUpdate);
  const isEditing = useEventStore(s => s.isEditing);
  const shareInput = useRef(null);
  const idPrefix = isEditing ? 'EditEvent' : 'Event';
  const classes = useStyles();

  if (!event) return null;

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.container}>
        <div className={classes.section}>
          {isEditing && (
            <div className={classes.section}>
              <Typography variant="h6">{t('event.fields.name')}</Typography>
              <TextField
                fullWidth
                value={event.name}
                onChange={e => setEventUpdate({name: e.target.value})}
                name="name"
                id="EditEventName"
              />
            </div>
          )}
          <Typography variant="h6">{t('event.fields.date')}</Typography>
          {isEditing ? (
            <DatePicker
              fullWidth
              placeholder={t('event.fields.date_placeholder')}
              value={event.date}
              onChange={date =>
                setEventUpdate({
                  date: !date ? null : moment(date).format('YYYY-MM-DD'),
                })
              }
              format="DD/MM/YYYY"
              cancelLabel={t('generic.cancel')}
              clearable
              clearLabel={t('generic.clear')}
              id={`${idPrefix}Date`}
            />
          ) : (
            <Typography variant="body1" id={`${idPrefix}Date`}>
              {event.date
                ? moment(event.date).format('DD/MM/YYYY')
                : t('event.fields.empty')}
            </Typography>
          )}
        </div>
        <div className={classes.section}>
          <Typography variant="h6">{t('event.fields.address')}</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              multiline
              rowsMax={4}
              inputProps={{maxLength: 250}}
              helperText={`${event.address.length}/250`}
              defaultValue={event.address}
              value={event.address}
              onChange={e => setEventUpdate({address: e.target.value})}
              id={`${idPrefix}Address`}
              name="address"
            />
          ) : (
            <Typography variant="body1" id={`${idPrefix}Address`}>
              {event.address ? (
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    event.address
                  )}`}
                  onClick={e => e.preventDefault}
                >
                  {event.address}
                </Link>
              ) : (
                t('event.fields.empty')
              )}
            </Typography>
          )}
        </div>
        <Typography variant="h6">{t('event.fields.link')}</Typography>
        <Typography>{t('event.fields.link_desc')}</Typography>
        <TextField
          value={window.location.href}
          inputProps={{
            ref: shareInput,
          }}
          InputProps={{disableUnderline: true}}
          onFocus={() => {
            if (shareInput) shareInput.current.select();
          }}
          fullWidth
          readOnly
          name="eventShareLink"
          id="ShareLink"
        />

        <Button
          className={'tour_event_share'}
          variant="outlined"
          startIcon={<Icon>share</Icon>}
          onClick={() => {
            if (shareInput) shareInput.current.select();
            onShare();
          }}
        >
          {t('event.fields.share')}
        </Button>
      </Box>
    </ThemeProvider>
  );
};

const theme = createMuiTheme({
  ...caroster,
  palette: {
    ...caroster.palette,
    type: 'dark',
  },
});

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2, 9),
    marginBottom: theme.spacing(12),

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  section: {
    marginBottom: theme.spacing(2),
  },
  map: {
    marginTop: theme.spacing(4),
  },
  seeOnGMapButton: {
    marginLeft: theme.spacing(2),
  },
}));

export default EventDetails;
