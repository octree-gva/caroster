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
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
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
        {error && <FormHelperText error={true}>{error}</FormHelperText>}
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
          gutterBottom
        />
        <RouterLink to="/reset-password" component={Link}>
          <Typography align="center" variant="body2">
            {t('lost_password.message')}
          </Typography>
        </RouterLink>
      </CardContent>
      <CardActions className={classes.actions} align="center">
        <Button size="small" id="SignInRegister" href="/register">
          {t('signin.register')}
        </Button>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
          id="SignInSubmit"
          endIcon={
            isLoading && (
              <CircularProgress className={classes.loader} size={20} />
            )
          }
        >
          {t('signin.login')}
        </Button>
      </CardActions>
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  loader: {
    marginLeft: '14px',
    color: theme.palette.background.paper,
  },
  actions: {
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
}));
export default SignIn;
