import {useState, useMemo} from 'react';
import NextLink from 'next/link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
import {useRouter} from 'next/router';

interface Props {
  error?: string;
}

const errorsMap = {
  CredentialsSignin: 'signin.errors.CredentialsSignin',
  EmailNotConfirmed: 'signin.errors.EmailNotConfirmed',
};

const SignIn = (props: Props) => {
  const {error} = props;
  const {t} = useTranslation();
  const router = useRouter();

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
        callbackUrl: (router.query?.redirectPath as string) || '/dashboard',
      });
      saveStoredEvents();
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
          <FormHelperText error sx={{textAlign: 'center'}}>
            {t(errorsMap[error])}
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
            <Typography
              align="center"
              variant="body2"
              color="primary"
              sx={{
                textDecoration: 'underline',
                textDecorationColor: 'primary',
              }}
            >
              {t('lost_password.message')}
            </Typography>
          </NextLink>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            pb: 1,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={!canSubmit}
            aria-disabled={!canSubmit}
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
          <Button size="small">{t('signin.register')}</Button>
        </NextLink>
      </CardActions>
    </form>
  );
};

export default SignIn;
