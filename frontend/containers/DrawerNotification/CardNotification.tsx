import {Box, Typography, Stack, Badge} from '@mui/material';
import {
  NotificationEntity,
  useReadNotificationsMutation,
} from '../../generated/graphql';
import {useRouter} from 'next/navigation';
import {useTranslation} from 'next-i18next';
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
        >
          <Box display="flex" alignItems="center" sx={{width: '192px'}}>
            {!notification.attributes.read && (
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
            <Typography variant="body2" color="text.secondary" noWrap>
              {eventName}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            {formatDate(notification.attributes.createdAt)}
          </Typography>
        </Stack>
        <Typography>
          {t(`notification.type.${notification.attributes.type}.content`)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CardNotification;
