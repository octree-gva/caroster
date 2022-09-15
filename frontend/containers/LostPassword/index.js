import {useCallback, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import router from 'next/router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardActions from '@material-ui/core/CardActions';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import LostPasswordSuccess from './Success';
import useToastStore from '../../stores/useToastStore';
import useProfile from '../../hooks/useProfile';
import {useForgotPasswordMutation} from '../../generated/graphql';

const LostPassword = () => {
  const {t} = useTranslation();
  const classes = useStyles();
  const addToast = useToastStore(s => s.addToast);
  const {profile} = useProfile();
  const [sendForgotPassword, {loading}] = useForgotPasswordMutation();
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const canSubmit = email.length > 4;

  useEffect(() => {
    if (profile?.confirmed) router.replace('/confirm');
    else if (profile) router.replace('/dashboard');
  }, [profile]);

  const onSubmit = useCallback(
    async e => {
      if (e.preventDefault) e.preventDefault();

      try {
        await sendForgotPassword({variables: {email}});
        setIsSent(true);
      } catch (error) {
        if (error.message === 'Bad Request') {
          addToast(t('lost_password.error'));
          setError(t('lost_password.error'));
        } else {
          addToast(t('generic.errors.unknown'));
        }
      }
      return false;
    },
    [sendForgotPassword, email, addToast, t]
  );

  if (!loading && isSent) return <LostPasswordSuccess email={email} />;

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardContent>
          <TextField
            label={t('lost_password.email')}
            fullWidth
            required={true}
            margin="dense"
            value={email}
            onChange={({target: {value = ''}}) => setEmail(value)}
            id="LostPasswordEmail"
            name="email"
            type="email"
            error={!!error}
            helperText={
              error && (
                <>
                  {error}&nbsp;
                  <Link href="/auth/register">
                    {t('lost_password.actions.register')}
                  </Link>
                </>
              )
            }
          />
        </CardContent>
        <CardActions className={classes.actions}>
          <Button id="LostPasswordRegister" href="/auth/login">
            {t('lost_password.actions.cancel')}
          </Button>

          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={!canSubmit}
            aria-disabled={!canSubmit}
            id="LostPasswordSubmit"
          >
            {t('lost_password.actions.send')}
            {loading && (
              <CircularProgress
                className={classes.loader}
                color="primary"
                size={20}
              />
            )}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  loader: {
    marginLeft: theme.spacing(4),
  },
  actions: {
    marginTop: theme.spacing(2),
    justifyContent: 'flex-end',
  },
}));
export default LostPassword;
