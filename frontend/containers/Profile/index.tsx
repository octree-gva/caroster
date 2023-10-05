import {useState} from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import EditPassword from './EditPassword';
import ProfileField from './ProfileField';
import useToastStore from '../../stores/useToastStore';
import {useUpdateMeMutation} from '../../generated/graphql';

const Profile = ({profile, logout}) => {
  const {t} = useTranslation();
  const addToast = useToastStore(s => s.addToast);

  const [updateProfile] = useUpdateMeMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const isStrapiUser = profile.provider === 'local';

  const resetPassword = () => {
    setIsEditingPassword(false);
    setNewPassword('');
    setOldPassword('');
    setErrorPassword('');
  };

  const savePassword = async () => {
    try {
      await updateProfile({
        variables: {
          userUpdate: {oldPassword, password: newPassword},
        },
      });
      addToast(t('profile.password_changed'));
      resetPassword();
    } catch (err) {
      if (err.message === 'Wrong password') {
        setErrorPassword(t('profile.errors.password_nomatch'));
        return;
      }
    }
  };

  const onSave = async () => {
    try {
      await updateProfile({
        variables: {
          userUpdate: {firstName, lastName, email},
        },
      });
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
    <Container maxWidth="sm" sx={{margin: 0, ml: 4}}>
      <Card sx={{width: '480px', maxWidth: '100%'}}>
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
            disabled={!isStrapiUser}
          />
        </CardContent>
        <CardActions>
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
          {isEditing && isStrapiUser && (
            <Button
              type="button"
              onClick={evt => {
                if (evt.preventDefault) evt.preventDefault();
                setIsEditingPassword(true);
              }}
            >
              {t('profile.actions.change_password')}
            </Button>
          )}
          {isEditing && (
            <Button
              type="submit"
              color="primary"
              onClick={onSave}
              variant="contained"
            >
              {t('profile.actions.save')}
            </Button>
          )}
        </CardActions>
      </Card>
    </Container>
  );
};

export default Profile;
