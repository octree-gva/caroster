import React from 'react';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Toolbar = ({anchorEl, setAnchorEl, actions = []}) => {
  const classes = useStyles();
  if (actions.length === 0) return null;
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
        actions.map(
          ({onClick, id, label, divider = false, ...menuItemProps}, idx) =>
            divider ? (
              <Divider variant="fullWidth" className={classes.divider} />
            ) : (
              <MenuItem
                onClick={() => {
                  if (!!onClick) onClick();
                  setAnchorEl(null);
                }}
                key={idx}
                id={id || `MenuItem${idx}`}
                {...menuItemProps}
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
export default Toolbar;
