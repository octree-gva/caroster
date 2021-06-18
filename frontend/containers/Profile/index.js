import {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import EditPassword from './EditPassword';
import ProfileField from './ProfileField';
import useToastStore from '../../stores/useToastStore';

const Profile = ({profile, updateProfile, logout}) => {
  const {t} = useTranslation();
  const addToast = useToastStore(s => s.addToast);
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
      if (err.message === 'Auth.form.error.password.matching') {
        setErrorPassword(t('profile.errors.password_nomatch'));
        return;
      }
    }
  };

  const onSave = async () => {
    try {
      await updateProfile({firstName, lastName, email});
      setIsEditing(false);
    } catch (error) {
      console.error(error);
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
    <form>
      <Card>
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
          {!isEditing && (
            <>
              <Button type="button" onClick={() => logout()}>
                {t('profile.actions.logout')}
              </Button>
              <Button
                type="button"
                color="primary"
                onClick={() => setIsEditing(true)}
                variant="contained"
              >
                {t('profile.actions.edit')}
              </Button>
            </>
          )}
          {isEditing && (
            <>
              <Button
                type="button"
                onClick={evt => {
                  if (evt.preventDefault) evt.preventDefault();
                  setIsEditingPassword(true);
                }}
              >
                {t('profile.actions.change_password')}
              </Button>
              <Button
                type="submit"
                color="primary"
                onClick={onSave}
                variant="contained"
              >
                {t('profile.actions.save')}
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  actions: {
    marginTop: theme.spacing(2),
    justifyContent: 'flex-end',
  },
}));
export default Profile;
