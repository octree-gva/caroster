import React, {useCallback, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAuth} from 'strapi-react-context';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardActions from '@material-ui/core/CardActions';
import Link from '@material-ui/core/Link';
import {useToast} from '../../contexts/Toast';
import {makeStyles} from '@material-ui/core/styles';
import LostPasswordSuccess from './Success';

const LostPassword = () => {
  const {t} = useTranslation();
  const classes = useStyles();

  const {token, authState, sendPasswordReset} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const {addToast} = useToast();

  const canSubmit = () => email.length < 4;

  const onSubmit = useCallback(
    async evt => {
      if (evt.preventDefault) evt.preventDefault();
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      try {
        await sendPasswordReset(email);
        setIsSent(true);
      } catch (error) {
        if (error.kind === 'bad_data') {
          addToast(t('lost_password.error'));
          setError(t('lost_password.error'));
        } else {
          addToast(t('generic.errors.unknown'));
        }
      }
      setIsLoading(false);
      return false;
    },
    [sendPasswordReset, email, isLoading, addToast, t]
  );

  if (token) {
    return <Redirect to="/dashboard" />;
  }
  if (authState && authState.user && !authState.user.confirmed) {
    return <Redirect to="/confirm" />;
  }

  if (!isLoading && isSent) {
    return <LostPasswordSuccess email={email} />;
  }

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
                  <Link href="/register">
                    {t('lost_password.actions.register')}
                  </Link>
                </>
              )
            }
          />
        </CardContent>
        <CardActions>
          <Button
            id="LostPasswordRegister"
            href="/login"
            color="secondary"
            variant="contained"
          >
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
            {isLoading && (
              <CircularProgress className={classes.loader} size={20} />
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
}));
export default LostPassword;
