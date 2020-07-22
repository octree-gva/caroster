import React, {useCallback, useState, useMemo, useEffect} from 'react';
import {Redirect, Link as RouterLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAuth} from 'strapi-react-context';
import TextField from '@material-ui/core/TextField';
import {useLocation} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {CircularProgress} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import {makeStyles} from '@material-ui/core/styles';
import {useToast} from '../../contexts/Toast';

const SignIn = () => {
  const {t} = useTranslation();
  const classes = useStyles();
  const location = useLocation();
  const {login, token, authState, loginWithProvider} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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
        await login(email, password);
        // TODO add to my event if saved in local storage
        // TODO remove from local storage.
      } catch (error) {
        console.log('ERROR', {error});
        if (error.kind === 'bad_data') {
          setError(t('signin.errors'));
          addToast(t('signin.errors'));
        }
      }

      setIsLoading(false);
      return false;
    },
    [email, password, login, isLoading, addToast, t]
  );

  // If an access token is given in URL params, login with auth provider
  useEffect(() => {
    const authWithGoogle = async search => {
      try {
        await loginWithProvider('google', search);
      } catch (error) {
        console.log('ERROR', {error});
        addToast(t('signin.errors'));
      }
    };

    if (location.search) authWithGoogle(location.search);
  }, [location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  if (token) return <Redirect to="/dashboard" />;
  if (authState?.user && !authState.user.confirmed)
    return <Redirect to="/confirm" />;

  return (
    <form onSubmit={onSubmit}>
      <CardContent className={classes.content}>
        <Typography variant="h6">{t('signin.title')}</Typography>
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
          error={!!error}
          helperText={error}
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
          error={!!error}
          helperText={
            error && (
              <RouterLink to="/lost-password" component={Link}>
                {t('lost_password.message')}
              </RouterLink>
            )
          }
        />
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
          id="SignInSubmit"
          fullWidth
        >
          {isLoading ? (
            <CircularProgress className={classes.loader} size={20} />
          ) : (
            t('signin.login')
          )}
        </Button>
        <Button id="SignInRegister" href="/register" fullWidth size="small">
          {t('signin.register')}
        </Button>
      </CardActions>
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loader: {
    marginLeft: '14px',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
export default SignIn;
