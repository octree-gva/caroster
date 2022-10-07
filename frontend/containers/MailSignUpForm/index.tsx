import {useState, useMemo} from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import {makeStyles} from '@material-ui/core/styles';
import useToastsStore from '../../stores/useToastStore';
import {useRegisterMutation} from '../../generated/graphql';
import SignUpActions from './SignupActions';

const SignUp = () => {
  const {t, i18n} = useTranslation();
  const classes = useStyles();
  const addToast = useToastsStore(s => s.addToast);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
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
      const lang = i18n.language.toUpperCase();
      await register({
        variables: {
          user: {
            username: email,
            email,
            password,
            firstName,
            lastName,
            newsletterConsent,
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

  return (
    <form onSubmit={onSubmit}>
      <CardContent className={classes.content}>
        <Typography
          variant="overline"
          component="h5"
          align="center"
          className={classes.lineBreak}
        >
          {t('signup.createForm')}
        </Typography>
        <Box className={classes.content}>
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
          className={classes.newsletter}
          control={
            <Checkbox
              className={classes.checkbox}
              color="primary"
              value={newsletterConsent}
              onChange={({target: {checked = false}}) =>
                setNewsletterConsent(checked)
              }
            />
          }
          label={t('signup.newsletter.consent')}
        />

        <Box className={classes.content}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={!canSubmit}
            className={classes.button}
            aria-disabled={!canSubmit}
            id="SignUpSubmit"
            endIcon={
              isLoading && (
                <CircularProgress
                  className={classes.loader}
                  size={20}
                  color="secondary"
                />
              )
            }
          >
            {t('signup.submit')}
          </Button>
        </Box>
        <Box className={classes.divider}>
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

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(0, 4),
  },
  lineBreak: {
    whiteSpace: 'pre-line',
    lineHeight: 1.8,
    paddingBottom: theme.spacing(4),
  },
  loader: {
    marginLeft: '14px',
    color: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
  },
  divider: {
    width: '100%',
    textAlign: 'center',
    margin: theme.spacing(2, 0),
  },
  newsletter: {
    width: '100%',
    margin: theme.spacing(2, 0),
  },
  checkbox: {
    padding: 0,
    marginRight: theme.spacing(2),
  },
}));

export default SignUp;
