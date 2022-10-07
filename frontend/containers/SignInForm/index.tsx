import {useState, useMemo} from 'react';
import NextLink from 'next/link';
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
import useAddToEvents from '../../hooks/useAddToEvents';
import useRedirectUrlStore from '../../stores/useRedirectUrl';
import LoginGoogle from '../LoginGoogle';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

interface Props {
  error?: string;
}

const SignIn = (props: Props) => {
  const {error} = props;
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      saveStoredEvents(); // TODO Check it's correctly executed after sign-in
    } catch (error) {
      console.error(error);
    }

    return false;
  };

  return (
    <form onSubmit={onSubmit}>
      <CardContent className={classes.content}>
        <Typography variant="h6" align="center">
          {t('signin.title')}
        </Typography>
        {error && (
          <FormHelperText error={true}>
            {t(`signin.errors.${error}`)}
          </FormHelperText>
        )}
        <Box className={classes.content}>
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
        </Box>

        <Box className={classes.divider}>
          <NextLink href="/auth/lost-password" passHref>
            <Link>
              <Typography align="center" variant="body2">
                {t('lost_password.message')}
              </Typography>
            </Link>
          </NextLink>
        </Box>
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
        <Box className={classes.divider}>
          <Typography>{t('signin.or')}</Typography>
        </Box>
        <LoginGoogle />
        <Box className={classes.divider}>
          <Divider />
        </Box>
        <Typography align="center" variant="body2">
          {t('signin.no_account')}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions} align="center">
        <NextLink href="/auth/register" passHref>
          <Button size="small" id="SignInRegister">
            {t('signin.register')}
          </Button>
        </NextLink>
      </CardActions>
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 6),
  },
  actions: {
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  divider: {
    width: '100%',
    textAlign: 'center',
    margin: theme.spacing(2, 0),
  },
}));
export default SignIn;
