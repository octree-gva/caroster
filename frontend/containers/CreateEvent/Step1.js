import React, {useState, useEffect, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {useTranslation} from 'react-i18next';
import useDebounce from '../../hooks/useDebounce';
import useProfile from '../../hooks/useProfile';
import {CardActions} from '@material-ui/core';

const Step1 = ({nextStep, event, addToEvent}) => {
  const {t} = useTranslation();
  const {connected, user} = useProfile();
  const classes = useStyles({connected});

  // States
  const [name, setName] = useState(event.name ?? '');
  const [email, setEmail] = useState(event.email ?? '');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const debouncedEmail = useDebounce(email, 400);

  useEffect(() => {
    setEmailIsValid(isValidEmail(debouncedEmail));
  }, [debouncedEmail]);

  const canSubmit = useMemo(() => {
    const n = name.length > 0;
    const e = email.length > 0 && emailIsValid;
    return connected ? n : n && e;
  }, [name, email, emailIsValid, connected]);

  const onNext = event => {
    if (event.preventDefault) event.preventDefault();
    const e = connected ? user.email : email;
    const n = connected ? true : newsletter;
    addToEvent({name, email: e, newsletter: n});
    nextStep();
    return false;
  };

  return (
    <form onSubmit={onNext}>
      <TextField
        label={t('event.creation.event_name')}
        fullWidth
        autoFocus
        margin="dense"
        value={name}
        onChange={e => setName(e.target.value)}
        id="NewEventName"
        name="name"
      />
      {!connected && (
        <>
          <TextField
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
                color="primary"
                id="NewEventNewsletter"
                checked={newsletter}
                onChange={e => setNewsletter(e.target.checked)}
              />
            }
          />
        </>
      )}
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

      {!connected && (
        <div className={classes.addFromAccountSection}>
          <Typography variant="body1">
            {t('event.creation.addFromAccount.title')}
          </Typography>
          <Typography variant="body2">
            {t('event.creation.addFromAccount.subtitle')}
          </Typography>
          <CardActions className={classes.actions}>
            <Button variant="text" href="/auth/register">
              {t('event.creation.addFromAccount.actions.register')}
            </Button>
            <Button color="primary" href="/auth/login">
              {t('event.creation.addFromAccount.actions.login')}
            </Button>
          </CardActions>
        </div>
      )}
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
  },
  newsletter: {
    marginTop: theme.spacing(2),
  },
  addFromAccountSection: {
    marginTop: theme.spacing(8),
    textAlign: 'center',
  },
  actions: {
    marginTop: theme.spacing(1),
    justifyContent: 'space-evenly',
    textAlign: 'center',
  },
}));

const isValidEmail = email =>
  // eslint-disable-next-line
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

export default Step1;
