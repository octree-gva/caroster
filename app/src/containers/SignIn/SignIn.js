import React, {useCallback, useState, useMemo} from 'react';
import {Redirect} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAuth} from 'strapi-react-context';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import {CircularProgress} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import {useToast} from '../../contexts/Toast';

export default () => {
  const {t} = useTranslation();
  const {login, token, authState} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {addToast} = useToast();

  const canSubmit = useMemo(
    () => [email, password].filter(s => s.length < 4).length === 0,
    [email, password]
  );

  const onSubmit = useCallback(
    async evt => {
      if (evt.preventDefault) evt.preventDefault();
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      try {
        const error = await login(email, password);
        if (error) {
          addToast(t('signin.errors'));
        }

        // TODO add to my event if saved in local storage
        // TODO remove from local storage.
      } catch (error) {
        console.log('ERROR', {error});
      }

      setIsLoading(false);
      return false;
    },
    [email, password, login, isLoading, addToast, t]
  );

  if (token) {
    return <Redirect to="/dashboard" />;
  }
  if (authState && authState.user && !authState.user.confirmed) {
    return <Redirect to="/confirm" />;
  }
  return (
    <form onSubmit={onSubmit}>
      <CardContent>
        <TextField
          label={t('signin.email')}
          fullWidth
          required={true}
          margin="dense"
          value={email}
          onChange={({target: {value = ''}}) => setEmail(value)}
          id="SignInEmail"
          name="email"
          type="email"
        />
        <TextField
          label={t('signin.password')}
          fullWidth
          required={true}
          margin="dense"
          value={password}
          onChange={({target: {value = ''}}) => setPassword(value)}
          id="SignInEmail"
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
          id="SignInSubmit"
        >
          {t('signin.login')}
          {isLoading && <CircularProgress size={20} />}
        </Button>
        <Button id="SignInRegister" href="/register">
          {t('signin.register')}
        </Button>
      </CardActions>
    </form>
  );
};
