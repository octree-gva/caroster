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
  const [loading, setLoading] = useState(false);

  const onCreate = async evt => {
    if (evt.preventDefault) evt.preventDefault();
    if (loading) return false;
    setLoading(true);
    const eventData = {
      date: !date ? null : moment(date).format('YYYY-MM-DD'),
      address,
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
        id="NewEventDate"
        fullWidth
        label={t('event.creation.date')}
        format="DD/MM/YYYY"
        value={date}
        onChange={setDate}
        clearable
        clearLabel={t('generic.clear')}
        cancelLabel={t('generic.cancel')}
      />
      <TextField
        label={t('event.creation.address')}
        fullWidth
        margin="dense"
        multiline
        rows={4}
        value={address}
        onChange={e => setAddress(e.target.value)}
        id="NewEventAddress"
        name="address"
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
          <CircularProgress
            className={classes.loader}
            size={20}
            color="primary"
          />
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
