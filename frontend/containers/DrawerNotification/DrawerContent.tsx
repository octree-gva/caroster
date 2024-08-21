import {Drawer, Box, Icon, Typography} from '@mui/material/';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  useReadNotificationsMutation,
  NotificationEntity,
} from '../../generated/graphql';
import CardNotification from './CardNotification';
import DrawerHeader from './DrawerHeader';
import {useTranslation} from 'next-i18next';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationEntity[];
}

const DrawerContent = ({isOpen, onClose, notifications}: Props) => {
  const isMobile = useMediaQuery('(max-width:400px)');
  const {t} = useTranslation();
  const hasNotifications = notifications.length > 0;
  const [readNotifications] = useReadNotificationsMutation();
  const isAllRead = notifications.every(
    notification => notification.attributes.read
  );

  const markAllRead = () =>
    readNotifications({refetchQueries: ['UserNotifications']});

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
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
            notifications.map(notification => (
              <CardNotification
                key={notification.id}
                onClose={onClose}
                notification={notification}
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
