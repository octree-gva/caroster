import React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {useTranslation} from 'next-i18next';
import TextField from '@mui/material/TextField';

const PREFIX = 'EditPassword';

const classes = {
  actions: `${PREFIX}-actions`,
};

const Root = styled('form')(({theme}) => ({
  [`& .${classes.actions}`]: {
    justifyContent: 'flex-end',
  },
}));

const EditPassword = ({
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  error,
  save,
  cancel,
}) => {
  const {t} = useTranslation();

  return (
    <Root
      onSubmit={evt => {
        evt?.preventDefault?.();
        save();
      }}
    >
      <Card>
        <CardContent>
          <TextField
            label={t('profile.current_password')}
            type="password"
            fullWidth
            autoFocus
            margin="dense"
            value={oldPassword}
            onChange={({target: {value = ''}}) => setOldPassword(value)}
            id="ProfileCurrentPassword"
            name="current_password"
            error={!!error}
            helperText={error}
          />
          <TextField
            type="password"
            label={t('profile.new_password')}
            fullWidth
            margin="dense"
            value={newPassword}
            onChange={({target: {value = ''}}) => setNewPassword(value)}
            id="ProfileNewPassword"
            name="new_password"
          />
        </CardContent>
        <CardActions className={classes.actions}>
          <Button type="button" onClick={cancel}>
            {t('profile.actions.cancel')}
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={oldPassword.length < 4 || newPassword.length < 4}
          >
            {t('profile.actions.save_new_password')}
          </Button>
        </CardActions>
      </Card>
    </Root>
  );
};

export default EditPassword;
