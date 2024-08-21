import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useTranslation} from 'next-i18next';
import ContentSwitch from './ContentSwitch';

interface Props {
  toggleNotification: () => void;
  toggleNewsletter: () => void;
  notificationChecked: boolean;
  newsletterChecked: boolean;
  isEditing: boolean;
}

const ManagingNotificationsField = ({
  isEditing,
  toggleNotification,
  toggleNewsletter,
  notificationChecked,
  newsletterChecked,
}: Props) => {
  const {t} = useTranslation();

  return (
    <Box px={2}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">{t('profile.notification.label')}</Typography>
        <ContentSwitch
          isEditing={isEditing}
          checked={notificationChecked}
          onChange={toggleNotification}
          trueLabel="profile.notification.value.yes"
          falseLabel="profile.notification.value.no"
          t={t}
        />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">{t('profile.newsletter.label')}</Typography>
        <ContentSwitch
          isEditing={isEditing}
          checked={newsletterChecked}
          onChange={toggleNewsletter}
          trueLabel="profile.newsletter.value.yes"
          falseLabel="profile.newsletter.value.no"
          t={t}
        />
      </Box>
    </Box>
  );
};

export default ManagingNotificationsField;
