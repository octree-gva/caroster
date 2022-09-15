import {useState, useMemo, useEffect} from 'react';
import {useRouter} from 'next/router';
import RouterLink from 'next/link';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import FormHelperText from '@material-ui/core/FormHelperText';
import CardActions from '@material-ui/core/CardActions';
import {useTranslation} from 'react-i18next';
import {signIn} from 'next-auth/react';
import useToastsStore from '../../stores/useToastStore';
import useLoginWithProvider from '../../hooks/useLoginWithProvider';
import useAddToEvents from '../../hooks/useAddToEvents';

const SignIn = () => {
  const {t} = useTranslation();
  const router = useRouter();
  const {loginWithProvider} = useLoginWithProvider();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const addToast = useToastsStore(s => s.addToast);
  const {saveStoredEvents} = useAddToEvents();
  const classes = useStyles();

  const canSubmit = useMemo(
    () => [email, password].filter(s => s.length < 4).length === 0,
    [email, password]
  );

  const onSubmit = async e => {
    e.preventDefault?.();
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/',
      });
      saveStoredEvents();
      router.push('/');
    } catch (error) {
      handleAuthError(error);
    }

    return false;
  };

  useEffect(() => {
    const authWithGoogle = async search => {
      try {
        await loginWithProvider('google', search);
      } catch (error) {
        handleAuthError(error);
      }
    };

    const search = getURLSearch(router);
    if (search) authWithGoogle(search);
  }, [router.route]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAuthError = error => {
    const strapiError = error.message;
    console.error({strapiError});
    if (strapiError === 'Invalid identifier or password') {
      setError(t('signin.errors'));
      addToast(t('signin.errors'));
    } else if (strapiError === 'Auth.form.error.confirmed') {
      setError(t('signin.unconfirmed'));
      addToast(t('signin.unconfirmed'));
    }
  };

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
        />
        <RouterLink href="/auth/lost-password">
          <Link>
            <Typography align="center" variant="body2">
              {t('lost_password.message')}
            </Typography>
          </Link>
        </RouterLink>
      </CardContent>
      <CardActions className={classes.actions} align="center">
        <Button size="small" id="SignInRegister" href="/auth/register">
          {t('signin.register')}
        </Button>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
          id="SignInSubmit"
        >
          {t('signin.login')}
        </Button>
      </CardActions>
    </form>
  );
};

const getURLSearch = router => router.asPath.replace(router.route, '');

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
}));
export default SignIn;
