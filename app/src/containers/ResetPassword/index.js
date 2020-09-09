import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
const ResetPassword = ({
  password,
  setPassword,
  passwordConfirmation,
  setPasswordConfirmation,
  error,
  isLoading,
}) => {
  const {t} = useTranslation();
  const classes = useStyles();
  return (
    <Card>
      <CardHeader title={t('profile.actions.change_password')} />
      <CardContent>
        <TextField
          label={t('lost_password.password')}
          type="password"
          fullWidth
          autoFocus
          margin="dense"
          value={password}
          onChange={({target: {value = ''}}) => setPassword(value)}
          id="ResetPasswordNewPassword"
          name="new_password"
          error={!!error}
          helperText={error}
        />
        <TextField
          type="password"
          label={t('lost_password.password_confirmation')}
          fullWidth
          margin="dense"
          value={passwordConfirmation}
          onChange={({target: {value = ''}}) => setPasswordConfirmation(value)}
          id="ResetPasswordNewPasswordConfirmation"
          name="new_password_confirmation"
        />
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={
            isLoading ||
            password.length < 4 ||
            password !== passwordConfirmation
          }
        >
          {t('lost_password.actions.save_new_password')}
        </Button>
      </CardActions>
    </Card>
  );
};
const useStyles = makeStyles(theme => ({
  actions: {
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
  },
}));
export default ResetPassword;
