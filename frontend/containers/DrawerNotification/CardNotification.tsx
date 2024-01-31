import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  NotificationEntity,
  useReadNotificationsMutation,
} from '../../generated/graphql';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import {useRouter} from 'next/navigation';
import {useTranslation} from 'react-i18next';
import {formatDate} from './formatDate';

interface NotificationProps {
  notification: NotificationEntity;
  onClose: () => void;
}

const CardNotification: React.FC<NotificationProps> = ({
  notification,
  onClose,
}: NotificationProps) => {
  const router = useRouter();
  const {t} = useTranslation();
  const [readNotifications] = useReadNotificationsMutation();

  const eventName = notification.attributes.event.data?.attributes?.name;

  const handleClick = () => {
    router.push(`/e/${notification.attributes.event.data.attributes.uuid}`);
    readNotifications({
      refetchQueries: ['UserNotifications'],
      variables: {id: notification.id},
    });
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
