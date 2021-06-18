import React, {useRef} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import {makeStyles, createMuiTheme, ThemeProvider} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {caroster} from '../../theme';
import useEventStore from '../../stores/useEventStore';

const EventDetails = ({onShare}) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const event = useEventStore(s => s.event);
  const setEventUpdate = useEventStore(s => s.setEventUpdate);
  const isEditing = useEventStore(s => s.isEditing);
  const shareInput = useRef(null);
  const idPrefix = isEditing ? 'EditEvent' : 'Event';

  if (!event) return null;

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <div className={classes.section}>
          {isEditing && (
            <div className={classes.section}>
              <Typography variant="h6">{t('event.fields.name')}</Typography>
              <TextField
                value={event.name}
                onChange={e => setEventUpdate({name: e.target.value})}
                fullWidth
                id="EditEventName"
                name="name"
              />
            </div>
          )}
          <Typography variant="h6">{t('event.fields.starts_on')}</Typography>
          {isEditing ? (
            <TextField
              id={`${idPrefix}Date`}
              fullWidth
              label={t('event.creation.date')}
              value={event.date}
              onChange={date => setEventUpdate({date})}
              name="date"
              type="date"
              InputLabelProps={{shrink: true}}
            />
          ) : (
            <Typography variant="body1" id={`${idPrefix}Date`}>
              {event.date
                ? moment(event.date).format('DD.MM.YYYY')
                : t('event.fields.empty')}
            </Typography>
          )}
        </div>
        <div className={classes.section}>
          <Typography variant="h6">{t('event.fields.address')}</Typography>
          {isEditing ? (
            <TextField
              defaultValue={event.address}
              value={event.address}
              onChange={e => setEventUpdate({address: e.target.value})}
              fullWidth
              multiline
              rows={4}
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
          variant="outlined"
          startIcon={<Icon>share</Icon>}
          onClick={() => {
            if (shareInput) shareInput.current.select();
            onShare();
          }}
        >
          {t('event.fields.share')}
        </Button>
      </div>
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
    marginBottom: theme.spacing(12),
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
