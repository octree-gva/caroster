import {useCallback, useState, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import {useTranslation} from 'next-i18next';
import router from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import CardActions from '@mui/material/CardActions';
import Link from '@mui/material/Link';
import LostPasswordSuccess from './Success';
import useToastStore from '../../stores/useToastStore';
import useProfile from '../../hooks/useProfile';
import {useForgotPasswordMutation} from '../../generated/graphql';

const PREFIX = 'LostPassword';

const classes = {
  loader: `${PREFIX}-loader`,
  actions: `${PREFIX}-actions`,
};

const Root = styled('form')(({theme}) => ({
  [`& .${classes.loader}`]: {
    marginLeft: theme.spacing(4),
  },

  [`& .${classes.actions}`]: {
    marginTop: theme.spacing(2),
    justifyContent: 'flex-end',
  },
}));

const LostPassword = () => {
  const {t} = useTranslation();

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
    <Root onSubmit={onSubmit}>
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
    </Root>
  );
};

export default LostPassword;
