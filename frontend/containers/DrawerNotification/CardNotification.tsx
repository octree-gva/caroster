import {Box, Typography, Stack, Badge} from '@mui/material/';
import {
  NotificationEntity,
  useReadNotificationsMutation,
} from '../../generated/graphql';
import {useRouter} from 'next/navigation';
import {useTranslation} from 'react-i18next';
import {formatDate} from './formatDate';

interface NotificationProps {
  notification: NotificationEntity;
  onClose: () => void;
}

const CardNotification = ({notification, onClose}: NotificationProps) => {
  const router = useRouter();
  const {t} = useTranslation();
  const [readNotifications] = useReadNotificationsMutation();

  const eventName = notification.attributes.event.data?.attributes?.name;

  const handleClick = () => {
    readNotifications({
      refetchQueries: ['UserNotifications'],
      variables: {id: notification.id},
    });

    router.push(`/e/${notification.attributes.event.data.attributes.uuid}`);
    onClose();
  };

  const showBadge = !notification.attributes.read;
  const notificationContentKey = `notification.type.${notification.attributes.type}.content`;
  const notificationContent = t(notificationContentKey);

  return (
    <Box
      padding={2}
      bgcolor="white"
      marginBottom={2}
      onClick={handleClick}
      sx={{cursor: 'pointer'}}
      borderRadius={1}
    >
      <Box>
        <Stack
          paddingBottom={1}
          direction="row"
          display="flex"
          justifyContent="space-between"
          spacing={2}
        >
          <Box display="flex" alignItems="center" sx={{width: '168px'}}>
            {showBadge && (
              <Badge
                sx={{pr: 2}}
                color="error"
                variant="dot"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              />
            )}
            <Typography variant="subtitle1" noWrap>
              {eventName}
            </Typography>
          </Box>

          <Typography variant="overline" color="text.secondary">
            {formatDate(notification.attributes.createdAt)}
          </Typography>
        </Stack>
        <Typography>{notificationContent}</Typography>
      </Box>
    </Box>
  );
};

export default CardNotification;
