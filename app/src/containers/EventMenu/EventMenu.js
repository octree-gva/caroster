import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useTranslation} from 'react-i18next';
import {useStrapi} from 'strapi-react-context';
const EventMenu = ({anchorEl, setAnchorEl, actions = []}) => {
  const {t} = useTranslation();
  const strapi = useStrapi();
  const [settings] = strapi.stores?.settings || [{}];

  const aboutMenuItem = {
    label: t('menu.about'),
    onClick: () => (window.location.href = settings['about_link']),
    id: 'AboutTabs',
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
    >
      {actions &&
        [...actions, aboutMenuItem].filter(Boolean).map((action, idx) => (
          <MenuItem
            onClick={() => {
              action.onClick();
              setAnchorEl(null);
            }}
            key={idx}
            id={action.id || `MenuItem${idx}`}
          >
            {action.label}
          </MenuItem>
        ))}
    </Menu>
  );
};
export default EventMenu;
