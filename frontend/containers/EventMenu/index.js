import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {Typography} from '@material-ui/core';
import useAuthStore from '../../stores/useAuthStore';
import useProfile from '../../hooks/useProfile';
import {useSettingQuery} from '../../generated/graphql';

const EventMenu = ({anchorEl, setAnchorEl, actions = []}) => {
  const {t} = useTranslation();
  const {data: {setting} = {}} = useSettingQuery();

  const logout = useAuthStore(s => s.logout);
  const {user} = useProfile();

  const classes = useStyles();
  const logoutMenuItem = user && {
    label: t('menu.logout'),
    onClick: () => {
      logout();
      window.location.href = setting['about_link'];
    },
    id: 'LogoutTabs',
  };
  const aboutMenuItem = {
    label: t('menu.about'),
    onClick: () => (window.location.href = setting['about_link']),
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
          .map(({label, id, onClick, divider = false, ...attributes}, idx) => {
            if (divider) {
              return (
                <Divider
                  key={idx}
                  variant="fullWidth"
                  className={classes.divider}
                />
              );
            }
            if (!!onClick)
              return (
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
              );

            return (
              <Typography
                variant="body1"
                key={idx}
                id={id || `MenuItem${idx}`}
                className={classes.textItem}
              >
                {label}
              </Typography>
            );
          })}
    </Menu>
  );
};
const useStyles = makeStyles(theme => ({
  divider: {
    margin: theme.spacing(1, 0),
  },
  textItem: {
    margin: theme.spacing(1, 2),
    '&:focus': {outline: 0},
  },
}));
export default EventMenu;
