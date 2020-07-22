import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import EditPassword from './EditPassword';
import {useToast} from '../../contexts/Toast';
import ProfileField from './ProfileField';
import {makeStyles} from '@material-ui/core';

const Profile = ({profile, updateProfile, logout}) => {
  const {t} = useTranslation();
  const {addToast} = useToast();
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const resetPassword = () => {
    setIsEditingPassword(false);
    setNewPassword('');
    setOldPassword('');
    setErrorPassword('');
  };

  const savePassword = async () => {
    try {
      await updateProfile({
        old_password: oldPassword,
        password: newPassword,
      });
      addToast(t('profile.password_changed'));
      resetPassword();
    } catch (err) {
      if (err.kind === 'bad_data') {
        setErrorPassword(t('profile.errors.password_nomatch'));
        return;
      }
    }
  };

  if (isEditingPassword)
    return (
      <EditPassword
        oldPassword={oldPassword}
        newPassword={newPassword}
        setOldPassword={setOldPassword}
        setNewPassword={setNewPassword}
        error={errorPassword}
        save={savePassword}
        cancel={resetPassword}
      />
    );

  return (
    <form
      onSubmit={evt => {
        if (evt.preventDefault) evt.preventDefault();
        if (isEditing) {
          try {
            updateProfile({firstName, lastName, email});
          } catch (err) {
            console.log(err);
            return;
          }
          addToast(t('profile.updated'));
        }
        setIsEditing(!isEditing);
      }}
    >
      <Card>
        <CardHeader
          action={
            <IconButton
              color="inherit"
              id="EditProfileAction"
              type="submit"
              title={
                isEditing
                  ? t('profile.actions.save')
                  : t('profile.actions.edit')
              }
            >
              <Icon>{isEditing ? 'done' : 'edit'}</Icon>
            </IconButton>
          }
          title={t('profile.title')}
        />
        <CardContent>
          <ProfileField
            name="firstName"
            value={firstName}
            label={t('profile.firstName')}
            defaultValue={t('profile.not_defined', {
              field: '$t(profile.firstName)',
            })}
            onChange={setFirstName}
            isEditing={isEditing}
          />
          <ProfileField
            name="lastName"
            value={lastName}
            label={t('profile.lastName')}
            defaultValue={t('profile.not_defined', {
              field: '$t(profile.lastName)',
            })}
            onChange={setLastName}
            isEditing={isEditing}
          />
          <ProfileField
            name="email"
            value={email}
            label={t('profile.email')}
            defaultValue={t('profile.not_defined', {
              field: '$t(profile.email)',
            })}
            onChange={setEmail}
            isEditing={isEditing}
          />
        </CardContent>
        <CardActions className={classes.actions}>
          {isEditing && (
            <Button
              type="button"
              color="primary"
              onClick={evt => {
                if (evt.preventDefault) evt.preventDefault();
                setIsEditingPassword(true);
              }}
            >
              {t('profile.actions.change_password')}
            </Button>
          )}
          {!isEditing && (
            <Button type="button" color="default" onClick={() => logout()}>
              {t('profile.actions.logout')}
            </Button>
          )}
        </CardActions>
      </Card>
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  actions: {
    marginTop: theme.spacing(2),
  },
}));
export default Profile;
