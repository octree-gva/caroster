import React, {useCallback, useState, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useAuth} from 'strapi-react-context';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {useToast} from '../../contexts/Toast';
import {Redirect} from 'react-router-dom';
import {CircularProgress} from '@material-ui/core';

const SignUp = () => {
  const {t} = useTranslation();
  const {signUp, authState = {}} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = useMemo(
    () =>
      [firstName, lastName, email, password].filter(s => s.length < 4)
        .length === 0,
    [firstName, lastName, email, password]
  );
  const {addToast} = useToast();

  const onSubmit = useCallback(
    async evt => {
      if (evt.preventDefault) evt.preventDefault();
      if (isLoading) return;
      setIsLoading(true);
      try {
        await signUp(email.replace(/\.@/, '_'), email, password, {
          firstName,
          lastName,
        });
      } catch (error) {
        if (error.kind && error.kind === 'bad_data')
          addToast(t('signup.errors.email_taken'));
        else if (error.kind) {
          addToast(t(`generic.errors.${error.kind}`));
        } else {
          addToast(t(`generic.errors.unknown`));
        }
      }
      console.log('SIGN UP');

      setIsLoading(false);
      return false;
    },
    [firstName, lastName, email, password, addToast, signUp, t, isLoading]
  );

  if (authState.user) {
    return authState.user.confirmed ? (
      <Redirect to="/dashboard" />
    ) : (
      <Redirect to="/register/success" />
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <CardContent>
        <TextField
          label={t('signup.firstName')}
          fullWidth
          autoFocus
          margin="dense"
          value={firstName}
          required={true}
          onChange={({target: {value = ''}}) => setFirstName(value)}
          id="SignUpFirstName"
          name="firstName"
        />
        <TextField
          label={t('signup.lastName')}
          fullWidth
          required={true}
          margin="dense"
          value={lastName}
          onChange={({target: {value = ''}}) => setLastName(value)}
          id="SignUpLastName"
          name="lastName"
        />
        <TextField
          label={t('signup.email')}
          fullWidth
          required={true}
          margin="dense"
          value={email}
          onChange={({target: {value = ''}}) => setEmail(value)}
          id="SignUpEmail"
          name="email"
          type="email"
        />
        <TextField
          label={t('signup.password')}
          fullWidth
          required={true}
          margin="dense"
          value={password}
          onChange={({target: {value = ''}}) => setPassword(value)}
          id="SignUpEmail"
          name="password"
          type="password"
        />
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
          id="SignUpSubmit"
        >
          {t('signup.submit')}
          {isLoading && <CircularProgress />}
        </Button>
        <Button id="SignUpLogin" href="/login">
          {t('signup.login')}
        </Button>
      </CardActions>
    </form>
  );
};

export default SignUp;
