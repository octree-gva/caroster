import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {useStrapi} from 'strapi-react-context';

const EventMenu = ({anchorEl, setAnchorEl, actions = []}) => {
  const {t} = useTranslation();
  const strapi = useStrapi();
  const classes = useStyles();
  const [settings] = strapi.stores?.settings || [{}];
  const aboutMenuItem = {
    label: t('menu.about'),
    onClick: () => (window.location.href = settings['about_link']),
    id: 'AboutTabs',
    className: classes.withDivider,
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
        [...actions, aboutMenuItem]
          .filter(Boolean)
          .map(({label, id, onClick, ...attributes}, idx) => (
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
          ))}
    </Menu>
  );
};

const useStyles = makeStyles(theme => ({
  withDivider: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));
export default EventMenu;
