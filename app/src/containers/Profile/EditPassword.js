import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

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
    <form
      onSubmit={evt => {
        // Stop editing
        if (evt.preventDefault) evt.preventDefault();
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
        <CardActions>
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
    </form>
  );
};

export default EditPassword;
