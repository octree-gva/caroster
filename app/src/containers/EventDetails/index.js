import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import {DatePicker} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import {makeStyles, createMuiTheme, ThemeProvider} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {useEvent} from '../../contexts/Event';
import Map from '../../components/Map';
import {caroster} from '../../theme';

const theme = createMuiTheme({
  ...caroster,
  palette: {
    ...caroster.palette,
    type: 'dark',
  },
});

const EventDetails = ({toggleDetails}) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const {event, isEditing, setEditingEvent, editingEvent} = useEvent();

  if (!event) return null;
  const idPrefix = isEditing ? 'EditEvent' : 'Event';

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <div className={classes.section}>
          {isEditing && (
            <div className={classes.section}>
              <Typography variant="h6">{t('event.fields.name')}</Typography>
              <TextField
                defaultValue={event.name}
                value={editingEvent.name}
                onChange={e =>
                  setEditingEvent({...editingEvent, name: e.target.value})
                }
                fullWidth
                id="EditEventName"
                name="name"
              />
            </div>
          )}
          <Typography variant="h6">{t('event.fields.starts_on')}</Typography>
          {isEditing ? (
            <DatePicker
              value={
                editingEvent.date
                  ? moment(editingEvent.date)
                  : event.date
                  ? moment(event.date)
                  : null
              }
              onChange={date =>
                setEditingEvent({...editingEvent, date: date?.toISOString()})
              }
              fullWidth
              format="DD.MM.YYYY"
              disablePast
              id={`${idPrefix}Date`}
              name="date"
              TextFieldComponent={p => <TextField {...p} />}
              cancelLabel={t('generic.cancel')}
            />
          ) : (
            <Typography variant="body1" id={`${idPrefix}Date`}>
              {moment(event.date).format('DD.MM.YYYY') ||
                t('event.fields.empty')}
            </Typography>
          )}
        </div>
        <div className={classes.section}>
          <Typography variant="h6">{t('event.fields.address')}</Typography>
          {isEditing ? (
            <TextField
              defaultValue={event.address}
              value={editingEvent.address}
              onChange={e =>
                setEditingEvent({...editingEvent, address: e.target.value})
              }
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
                  href={`https://maps.google.com/?q=${encodeURI(
                    event.address
                  )}`}
                  rel="noopener noreferrer"
                  component="a"
                  target="_blank"
                >
                  {event.address}
                </Link>
              ) : (
                t('event.fields.empty')
              )}
            </Typography>
          )}
        </div>
        <div className={classes.actions}>
          <Button onClick={toggleDetails} variant="contained" id={`CarFindBtn`}>
            {t('event.actions.find_car')}
          </Button>
        </div>
        {event.position && (
          <div className={classes.map} id={`${idPrefix}AddressMap`}>
            <Map position={event.position} />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(12),
  },
  section: {
    marginBottom: theme.spacing(2),
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
  map: {
    marginTop: theme.spacing(4),
  },
  seeOnGMapButton: {
    marginLeft: theme.spacing(2),
  },
}));

export default EventDetails;
