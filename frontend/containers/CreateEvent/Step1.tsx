import React, {useState, useEffect, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NextLink from 'next/link'
import {useTranslation} from 'react-i18next';
import {CardActions} from '@material-ui/core';
import {useSession} from 'next-auth/react';
import useDebounce from '../../hooks/useDebounce';
import {isValidEmail} from '../../lib/formValidation';

const Step1 = ({nextStep, event, addToEvent}) => {
  const {t} = useTranslation();
  const session = useSession();
  const user = session?.data?.user;
  const isAuthenticated = session.status === 'authenticated';
  const classes = useStyles({connected: isAuthenticated});

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
    return isAuthenticated ? n : n && e;
  }, [name, email, emailIsValid, isAuthenticated]);

  const onNext = submitEvent => {
    if (submitEvent.preventDefault) submitEvent.preventDefault();
    addToEvent({
      name,
      email: isAuthenticated ? user.email : email,
      newsletter: isAuthenticated ? true : newsletter,
    });
    nextStep();
    return false;
  };

  return (
    <form onSubmit={onNext}>
      <TextField
        label={t('event.creation.name')}
        fullWidth
        autoFocus
        margin="dense"
        value={name}
        onChange={e => setName(e.target.value)}
        id="NewEventName"
        name="name"
      />
      {!isAuthenticated && (
        <>
          <TextField
            label={t('event.creation.creator_email')}
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email"
            type="email"
            id="NewEventEmail"
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

      {!isAuthenticated && (
        <div className={classes.addFromAccountSection}>
          <Typography variant="body1">
            {t('event.creation.addFromAccount.title')}
          </Typography>
          <Typography variant="body2">
            {t('event.creation.addFromAccount.subtitle')}
          </Typography>
          <CardActions className={classes.actions}>
            <NextLink href="/auth/register" passHref>
              <Button variant="text">
                {t('event.creation.addFromAccount.actions.register')}
              </Button>
            </NextLink>
            <NextLink href="/auth/login" passHref>
              <Button color="primary">
                {t('event.creation.addFromAccount.actions.login')}
              </Button>
            </NextLink>
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

export default Step1;
