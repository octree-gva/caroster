import {useState, useMemo, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import {useRouter} from 'next/router';
import RouterLink from 'next/link';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
import CardActions from '@material-ui/core/CardActions';
import {makeStyles} from '@material-ui/core/styles';
import useLoginForm from '../../hooks/useLoginForm';
import useToastsStore from '../../stores/useToastStore';
import useLoginWithProvider from '../../hooks/useLoginWithProvider';
import useAddToEvents from '../../hooks/useAddToEvents';

const SignIn = () => {
  const {t} = useTranslation();
  const classes = useStyles();
  const router = useRouter();
  const {loginWithProvider} = useLoginWithProvider();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const addToast = useToastsStore(s => s.addToast);
  const {login, loading} = useLoginForm(email, password);
  const {saveStoredEvents} = useAddToEvents();

  const canSubmit = useMemo(
    () => [email, password].filter(s => s.length < 4).length === 0,
    [email, password]
  );

  const onSubmit = async e => {
    e.preventDefault?.();
    try {
      await login();
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
    const strapiError = getStrapiError(error);
    console.error({strapiError});
    if (strapiError === 'Auth.form.error.invalid') {
      setError(t('signin.errors'));
      addToast(t('signin.errors'));
    } else if (strapiError === 'Auth.form.error.confirmed') {
      setError(t('signin.unconfirmed'));
      addToast(t('signin.unconfirmed'));
    } else if (strapiError === 'Auth.form.error.email.taken') {
      addToast(t('signup.errors.email_taken'));
    } else console.error(error);
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
          endIcon={
            loading && <CircularProgress className={classes.loader} size={20} />
          }
        >
          {t('signin.login')}
        </Button>
      </CardActions>
    </form>
  );
};

const getStrapiError = error => {
  if (error.message?.[0]?.messages?.[0]) return error.message[0].messages[0].id;
  return error?.graphQLErrors?.[0].extensions.exception.data.message[0]
    .messages[0].id;
};

const getURLSearch = router => router.asPath.replace(router.route, '');

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
