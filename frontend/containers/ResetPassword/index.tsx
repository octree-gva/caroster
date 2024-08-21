import React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {useTranslation} from 'next-i18next';
import TextField from '@mui/material/TextField';
const PREFIX = 'ResetPassword';

const classes = {
  actions: `${PREFIX}-actions`,
};

const StyledCard = styled(Card)(({theme}) => ({
  [`& .${classes.actions}`]: {
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
  },
}));

const ResetPassword = ({
  password,
  setPassword,
  passwordConfirmation,
  setPasswordConfirmation,
  error,
  isLoading,
}) => {
  const {t} = useTranslation();

  return (
    <StyledCard>
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
    </StyledCard>
  );
};
export default ResetPassword;
