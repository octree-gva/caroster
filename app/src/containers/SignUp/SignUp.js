import React, {useCallback, useState, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useAuth} from 'strapi-react-context';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActions';
import CardActions from '@material-ui/core/CardActions';
import {useToast} from '../../contexts/Toast';
import {Redirect} from 'react-router-dom';
import {CircularProgress} from '@material-ui/core';

export default () => {
  const {t} = useTranslation();
  const {signUp, token} = useAuth();
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
      setIsLoading(true);
      try {
        const error = await signUp(email.replace(/\.@/, '_'), email, password, {
          firstName,
          lastName,
        });
        if (error) {
          addToast(t('signup.errors.email_taken'));
        }
      } catch (error) {
        console.log('ERROR', {error});
        // if (error.statusCode && error.statusCode === 400) {
        //   const [message] = error.message.messages;
        //   console.log('add toast', message);
        //   addToast(message.message);
        // }
      }
      console.log('SIGN UP');

      setIsLoading(false);
      return false;
    },
    [firstName, lastName, email, password, addToast, signUp]
  );
  if (isLoading) {
    return (
      <CardContent>
        <CircularProgress />
      </CardContent>
    );
  }

  if (token) {
    return <Redirect to="/dashboard" />;
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
      <CardActionArea>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={!canSubmit}
            aria-disabled={!canSubmit}
            id="SignUpSubmit"
            s
          >
            {t('signup.submit')}
          </Button>
          <Button id="SignUpLogin" href="/login">
            {t('signup.login')}
          </Button>
        </CardActions>
      </CardActionArea>
    </form>
  );
};
