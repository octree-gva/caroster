import {useState, useMemo} from 'react';
import NextLink from 'next/link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import FormHelperText from '@mui/material/FormHelperText';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';
import {signIn} from 'next-auth/react';
import useAddToEvents from '../../hooks/useAddToEvents';
import LoginGoogle from '../LoginGoogle';

interface Props {
  error?: string;
}

const SignIn = (props: Props) => {
  const {error} = props;
  const {t} = useTranslation();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {saveStoredEvents} = useAddToEvents();

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
        callbackUrl: '/dashboard',
      });
      saveStoredEvents(); // TODO Check it's correctly executed after sign-in
    } catch (error) {
      console.error(error);
    }

    return false;
  };

  const spaceAround = {
    width: '100%',
    textAlign: 'center',
    margin: theme.spacing(2, 0),
  };

  return (
    <form onSubmit={onSubmit}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: 2,
        }}
      >
        <Typography variant="h6" align="center">
          {t('signin.title')}
        </Typography>
        {error && (
          <FormHelperText error={true}>
            {t(`signin.errors.${error}`)}
          </FormHelperText>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            label={t('signin.email')}
            fullWidth
            required={true}
            InputLabelProps={{required: false}}
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
            InputLabelProps={{required: false}}
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

        <Box sx={spaceAround}>
          <NextLink href="/auth/lost-password" passHref>
            <Link>
              <Typography align="center" variant="body2">
                {t('lost_password.message')}
              </Typography>
            </Link>
          </NextLink>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            pb: 1
          }}
        >
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={!canSubmit}
            aria-disabled={!canSubmit}
            id="SignInSubmit"
          >
            {t('signin.login')}
          </Button>
          <Box sx={spaceAround}>
            <Typography>{t('signin.or')}</Typography>
          </Box>
          <LoginGoogle />
        </Box>
      </CardContent>
      <Divider />
      <CardActions
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          marginBottom: theme.spacing(2),
          textAlign: 'center',
          px: 2,
        }}
      >
        <Typography align="center" variant="body2" sx={{pt: 2}}>
          {t('signin.no_account')}
        </Typography>
        <NextLink href="/auth/register" passHref>
          <Button size="small" id="SignInRegister">
            {t('signin.register')}
          </Button>
        </NextLink>
      </CardActions>
    </form>
  );
};

export default SignIn;
