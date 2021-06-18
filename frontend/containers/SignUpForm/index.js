import {useState, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import {useRouter} from 'next/router';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import useToastsStore from '../../stores/useToastStore';
import {useRegisterMutation} from '../../generated/graphql';
import useAuthStore from '../../stores/useAuthStore';

const SignUp = () => {
  const {t} = useTranslation();
  const classes = useStyles();
  const addToast = useToastsStore(s => s.addToast);
  const router = useRouter();
  const setToken = useAuthStore(s => s.setToken);
  const setUser = useAuthStore(s => s.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();

  const canSubmit = useMemo(
    () =>
      [firstName, lastName, email, password].filter(s => s.length < 2)
        .length === 0,
    [firstName, lastName, email, password]
  );

  const onSubmit = async e => {
    e.preventDefault?.();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const {data} = await register({
        variables: {
          email,
          password,
          username: `${firstName} ${lastName}`,
        },
      });
      setToken(data.register.jwt);
      setUser(data.register.user);
      router.push('/dashboard');
    } catch (error) {
      const strapiError = getStrapiError(error);
      console.error({strapiError});
      if (strapiError === 'Auth.form.error.email.taken')
        setError(t('signup.errors.email_taken'));
      else addToast(t(`generic.errors.unknown`));
    }
    setIsLoading(false);
    return false;
  };

  return (
    <form onSubmit={onSubmit}>
      <CardContent className={classes.content}>
        <Typography variant="h6">{t('signup.title')}</Typography>
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
          error={!!error}
          helperText={error}
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
          gutterBottom
          required={true}
          margin="dense"
          value={password}
          onChange={({target: {value = ''}}) => setPassword(value)}
          id="SignUpEmail"
          name="password"
          type="password"
        />
      </CardContent>
      <CardActions className={classes.actions}>
        <Button id="SignUpLogin" href="/auth/login" variant="text">
          {t('signup.login')}
        </Button>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={!canSubmit}
          className={classes.button}
          aria-disabled={!canSubmit}
          id="SignUpSubmit"
          iconEnd={
            isLoading && (
              <CircularProgress
                class={classes.loader}
                size={20}
                color="secondary"
              />
            )
          }
        >
          {t('signup.submit')}
        </Button>
      </CardActions>
    </form>
  );
};

const getStrapiError = error =>
  error?.graphQLErrors?.[0].extensions.exception.data.message[0].messages[0].id;

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loader: {
    marginLeft: '14px',
    color: theme.palette.background.paper,
  },
  actions: {
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));
export default SignUp;
