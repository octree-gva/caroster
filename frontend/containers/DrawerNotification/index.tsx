import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import React, {useState} from 'react';
import {useUserNotificationsQuery} from '../../generated/graphql';
import Badge from '@mui/material/Badge';
import DrawerContent from './DrawerContent';

const DrawerNotification = () => {
  const POLL_INTERVAL = 30000;
  const {data} = useUserNotificationsQuery({
    pollInterval: POLL_INTERVAL,
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const notifications = data?.me?.profile?.notifications?.data || [];

  const hasUnreadNotifications = notifications.some(
    notification => !notification.attributes.read
  );

  return (
    <>
      <IconButton
        sx={{marginRight: 0}}
        color="inherit"
        edge="end"
        id="NotificationBtn"
        aria-label="notifications"
        onClick={() => setIsDrawerOpen(true)}
      >
        {hasUnreadNotifications ? (
          <Badge color="error" variant="dot">
            <Icon>notifications_none_outlined</Icon>
          </Badge>
        ) : (
          <Icon>notifications_none_outlined</Icon>
        )}
      </IconButton>

      <DrawerContent
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};

export default DrawerNotification;
