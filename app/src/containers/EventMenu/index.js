import React from 'react';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {useStrapi, useAuth} from 'strapi-react-context';

const EventMenu = ({anchorEl, setAnchorEl, actions = []}) => {
  const {t} = useTranslation();
  const strapi = useStrapi();
  const {logout, authState} = useAuth();
  const classes = useStyles();
  const [settings] = strapi.stores?.settings || [{}];
  const logoutMenuItem = authState?.user
    ? {label: t('menu.logout'), onClick: logout, id: 'LogoutTabs'}
    : null;
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
        [...actions, aboutMenuItem, logoutMenuItem]
          .filter(Boolean)
          .map(({label, id, onClick, divider = false, ...attributes}, idx) =>
            divider ? (
              <Divider variant="fullWidth" className={classes.divider} />
            ) : (
              <MenuItem
                onClick={() => {
                  onClick();
                  setAnchorEl(null);
                }}
                key={idx}
                id={id || `MenuItem${idx}`}
                {...attributes}
              >
                {label}
              </MenuItem>
            )
          )}
    </Menu>
  );
};
const useStyles = makeStyles(theme => ({
  divider: {
    margin: theme.spacing(1, 0),
  },
}));
export default EventMenu;
