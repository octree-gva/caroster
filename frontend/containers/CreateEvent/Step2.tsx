import {useState} from 'react';
import {useRouter} from 'next/router';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {CircularProgress} from '@material-ui/core';
import {DatePicker} from '@material-ui/pickers';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import useToastStore from '../../stores/useToastStore';

const Step2 = ({event, addToEvent, createEvent}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const router = useRouter();
  const addToast = useToastStore(s => s.addToast);

  // States
  const [date, setDate] = useState(null);
  const [address, setAddress] = useState(event.address ?? '');
  const [description, setDescription] = useState(event.description ?? '');
  const [loading, setLoading] = useState(false);

  const onCreate = async evt => {
    if (evt.preventDefault) evt.preventDefault();
    if (loading) return false;
    setLoading(true);
    const eventData = {
      date: !date ? null : moment(date).format('YYYY-MM-DD'),
      address,
      description,
    };
    addToEvent(eventData);
    const result = await createEvent(eventData);
    if (!result) addToast(t('event.errors.cant_create'));
    else router.push(`/e/${result.uuid}`);
    setLoading(false);
    return false;
  };

  return (
    <form onSubmit={onCreate}>
      <DatePicker
        fullWidth
        label={t('event.creation.date')}
        value={date}
        onChange={setDate}
        format="DD/MM/YYYY"
        cancelLabel={t('generic.cancel')}
        clearable
        clearLabel={t('generic.clear')}
        id="NewEventDate"
      />
      <TextField
        label={t('event.creation.address')}
        fullWidth
        multiline
        rowsMax={4}
        inputProps={{maxLength: 250}}
        helperText={`${address.length}/250`}
        value={address}
        onChange={e => setAddress(e.target.value)}
        name="address"
        id="NewEventAddress"
      />
      <TextField
        label={t('event.creation.description')}
        fullWidth
        multiline
        rowsMax={4}
        inputProps={{maxLength: 250}}
        helperText={
          description.length === 0
            ? t('event.creation.description_helper')
            : `${description.length}/250`
        }
        value={description}
        onChange={e => setDescription(e.target.value)}
        name="address"
        id="NewEventDescription"
      />
      <Button
        disabled={loading}
        className={classes.button}
        variant="contained"
        color="secondary"
        fullWidth
        type="submit"
        id="NewEventSubmit"
      >
        {loading ? (
          <CircularProgress size={20} color="primary" />
        ) : (
          t('generic.create')
        )}
      </Button>
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
  },
}));

export default Step2;
