import {useState, useMemo} from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import {useTheme} from '@mui/material/styles';
import {Trans, useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import useToastsStore from '../../stores/useToastStore';
import SignUpActions from './SignupActions';
import {useRegisterMutation} from '../../generated/graphql';
import useSettings from '../../hooks/useSettings';
import moment from 'moment';

const SignUp = () => {
  const {t, i18n} = useTranslation();
  const theme = useTheme();
  const addToast = useToastsStore(s => s.addToast);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [tosConsent, setTosConsent] = useState(false);
  const [register] = useRegisterMutation();
  const settings = useSettings();

  const canSubmit = useMemo(
    () =>
      [firstName, lastName, email, password].filter(s => s.length < 2)
        .length === 0 && tosConsent,
    [firstName, lastName, email, password, tosConsent]
  );

  const onSubmit = async e => {
    e.preventDefault?.();
    if (isLoading) return;
    setIsLoading(true);
    const tosAcceptationDate = tosConsent ? moment().toISOString() : null;
    try {
      const lang = i18n.language;
      await register({
        variables: {
          user: {
            username: email,
            email,
            password,
            firstName,
            lastName,
            newsletterConsent,
            tosAcceptationDate,
            lang,
          },
        },
      });
      router.push('/auth/confirm');
    } catch (error) {
      const strapiError = error.message;
      console.error({strapiError});
      if (strapiError === 'Email or Username are already taken')
        setError(t('signup.errors.email_taken'));
      else addToast(t(`generic.errors.unknown`));
    }
    setIsLoading(false);
    return false;
  };

  const contentSx = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(0, 4),
  };

  return (
    <form onSubmit={onSubmit}>
      <CardContent sx={contentSx}>
        <Typography
          variant="h6"
          align="center"
          sx={{
            whiteSpace: 'pre-line',
            paddingBottom: theme.spacing(4),
          }}
        >
          {t('signup.createForm')}
        </Typography>
        <Box sx={contentSx}>
          <TextField
            label={t('signup.firstName')}
            fullWidth
            autoFocus
            margin="dense"
            value={firstName}
            InputLabelProps={{required: false}}
            required={true}
            onChange={({target: {value = ''}}) => setFirstName(value)}
            id="SignUpFirstName"
            name="firstName"
          />
          <TextField
            label={t('signup.lastName')}
            fullWidth
            InputLabelProps={{required: false}}
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
            InputLabelProps={{required: false}}
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
            InputLabelProps={{required: false}}
            required={true}
            margin="dense"
            value={password}
            onChange={({target: {value = ''}}) => setPassword(value)}
            id="SignUpEmail"
            name="password"
            type="password"
          />
        </Box>
        <FormControlLabel
          sx={{
            width: '100%',
            mt: 2,
            px: 5.5,
          }}
          componentsProps={{typography: {align: 'left', variant: 'body2'}}}
          control={
            <Checkbox
              sx={{p: 0, mr: 2}}
              color="primary"
              value={newsletterConsent}
              onChange={({target: {checked = false}}) =>
                setNewsletterConsent(checked)
              }
            />
          }
          label={t('signup.newsletter.consent')}
        />
        <FormControlLabel
          sx={{width: '100%', mt: 2, px: 5.5}}
          componentsProps={{typography: {align: 'left', variant: 'body2'}}}
          label={
            <Trans
              i18nKey="signup.tos.consent"
              components={{
                'tos-link': <a href={settings.tos_link} target="_blank" />,
                'data-privacy-link': (
                  <a href={settings.data_policy_link} target="_blank" />
                ),
              }}
            />
          }
          control={
            <Checkbox
              sx={{p: 0, mr: 2}}
              value={tosConsent}
              onChange={e => setTosConsent(e.target.checked)}
            />
          }
        />

        <Box sx={contentSx} mt={2}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={!canSubmit}
            sx={{margin: theme.spacing(1)}}
            aria-disabled={!canSubmit}
            id="SignUpSubmit"
            endIcon={
              isLoading && (
                <CircularProgress
                  sx={{
                    marginLeft: '14px',
                    color: theme.palette.background.paper,
                  }}
                  size={20}
                  color="secondary"
                />
              )
            }
          >
            {t('signup.submit')}
          </Button>
        </Box>
        <Box
          sx={{width: '100%', textAlign: 'center', margin: theme.spacing(2, 0)}}
        >
          <Divider />
        </Box>
        <Typography align="center" variant="body2">
          {t('signup.account_already')}
        </Typography>
      </CardContent>
      <SignUpActions />
    </form>
  );
};

export default SignUp;
