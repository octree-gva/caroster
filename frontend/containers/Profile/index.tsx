import {useReducer, useState} from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {useTranslation} from 'next-i18next';
import ProfileField from './ProfileField';
import {
  UsersPermissionsUser,
  useUpdateMeMutation,
} from '../../generated/graphql';
import ManagingNotificationsField from './ManagingNotificationsField';
import StripeDashboardLink from './StripeDashboardLink';
import {Box, Divider} from '@mui/material';
import theme from '../../theme';

interface Props {
  profile: UsersPermissionsUser;
  logout: () => void;
}

const Profile = ({profile, logout}: Props) => {
  const {t} = useTranslation();

  const [updateProfile] = useUpdateMeMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);
  const [newsletterConsent, toggleNewsletter] = useReducer(
    i => !i,
    profile.newsletterConsent
  );
  const [notificationEnabled, toggleNotification] = useReducer(
    i => !i,
    profile.notificationEnabled
  );

  const isStrapiUser = profile.provider === 'local';

  const onSave = async () => {
    try {
      await updateProfile({
        variables: {
          userUpdate: {
            firstName,
            lastName,
            email,
            newsletterConsent,
            notificationEnabled,
          },
        },
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        margin: 0,
        ml: 4,
        [theme.breakpoints.down('sm')]: {
          ml: 0,
        },
      }}
    >
      <Card sx={{width: '480px', maxWidth: '100%'}}>
        <CardContent>
          <Box>
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
          </Box>
        </CardContent>
        <Divider />
        <Box my={4}>
          <ManagingNotificationsField
            isEditing={isEditing}
            notificationChecked={notificationEnabled}
            newsletterChecked={newsletterConsent}
            toggleNotification={toggleNotification}
            toggleNewsletter={toggleNewsletter}
          />
          <StripeDashboardLink />
        </Box>
        <Divider />
        <CardActions sx={{justifyContent: 'flex-end'}}>
          {!isEditing && (
            <>
              <Button type="button" onClick={logout}>
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
