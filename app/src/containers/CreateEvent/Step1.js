import React, {useState, useEffect, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {useTranslation} from 'react-i18next';
import useDebounce from '../../hooks/useDebounce';
import Paper from '../../components/Paper';

const isValidEmail = email =>
  // eslint-disable-next-line
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

const Step1 = ({
  nextStep,
  previousStep,
  createEvent,
  event,
  addToEvent,
  ...props
}) => {
  const classes = useStyles();
  const {t} = useTranslation();

  // States
  const [name, setName] = useState(event.name ?? '');
  const [email, setEmail] = useState(event.email ?? '');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const debouncedEmail = useDebounce(email, 400);
  const canSubmit = useMemo(
    () => name.length > 0 && email.length > 0 && emailIsValid,
    [name, email, emailIsValid]
  );
  useEffect(() => {
    setEmailIsValid(isValidEmail(debouncedEmail));
  }, [debouncedEmail]);

  const onNext = event => {
    if (event.preventDefault) event.preventDefault();
    addToEvent({name, email, newsletter});
    nextStep();
    return false;
  };

  return (
    <Paper {...props}>
      <form onSubmit={onNext}>
        <TextField
          className={classes.textField}
          label={t('event.creation.event_name')}
          fullWidth
          autoFocus
          margin="dense"
          value={name}
          onChange={e => setName(e.target.value)}
          id="NewEventName"
          name="name"
        />
        <TextField
          className={classes.textField}
          label={t('event.creation.creator_email')}
          fullWidth
          margin="dense"
          value={email}
          onChange={e => setEmail(e.target.value)}
          id="NewEventEmail"
          name="email"
          type="email"
        />
        <FormControlLabel
          className={classes.newsletter}
          label={t('event.creation.newsletter')}
          control={
            <Checkbox
              name="newsletter"
              id="NewEventNewsletter"
              checked={newsletter}
              onChange={e => setNewsletter(e.target.checked)}
            />
          }
        />
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
        >
          {t('event.creation.next')}
        </Button>
      </form>
    </Paper>
  );
};

const useStyles = makeStyles(theme => ({
  textField: {},
  button: {
    marginTop: theme.spacing(2),
  },
  newsletter: {
    marginTop: theme.spacing(2),
  },
}));

export default Step1;
