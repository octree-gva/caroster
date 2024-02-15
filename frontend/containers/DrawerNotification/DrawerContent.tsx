import {Drawer, Box, Icon, Typography} from '@mui/material/';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  useUserNotificationsQuery,
  useReadNotificationsMutation,
  NotificationEntity,
} from '../../generated/graphql';
import CardNotification from './CardNotification';
import DrawerHeader from './DrawerHeader';
import {useTranslation} from 'react-i18next';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  notification: NotificationEntity;
}

const DrawerContent = ({isOpen, onClose}: Props) => {
  const {data} = useUserNotificationsQuery();
  const [readNotifications] = useReadNotificationsMutation();
  const {t} = useTranslation();
  const notifications = data?.me?.profile?.notifications?.data || [];
  const hasNotifications = notifications.length > 0;
  const markAllRead = () => {
    readNotifications({refetchQueries: ['UserNotifications']});
  };
  const isAllRead = notifications.every(
    notification => notification.attributes.read
  );
  const isMobile = useMediaQuery('(max-width:400px)');

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      hideBackdrop={true}
      sx={{
        height: 'auto',
        '& .MuiDrawer-paper': {
          width: isMobile ? '100%' : '375px',
          maxWidth: '100%',
        },
      }}
    >
      <Box
        bgcolor="background.default"
        padding={2}
        sx={{height: '100%', overflow: 'auto'}}
      >
        <DrawerHeader
          onClose={onClose}
          markAllRead={markAllRead}
          disabled={isAllRead}
        />
        <Box>
          {hasNotifications ? (
            notifications.map((notification, index) => (
              <CardNotification
                key={notification.id}
                onClose={onClose}
                notification={notification}
                isRead={readNotifications[index]}
              />
            ))
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              paddingY={4}
            >
              <Icon>inbox</Icon>
              <Typography color="initial" sx={{pl: 2}}>
                {t`notifications.content`}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerContent;
