import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Toolbar = ({anchorEl, setAnchorEl, actions = []}) => {
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
        actions.map(({onClick, id, label, ...menuItemProps}, idx) => (
          <MenuItem
            onClick={() => {
              if (!onClick) return;
              onClick();
              setAnchorEl(null);
            }}
            key={idx}
            id={id || `MenuItem${idx}`}
            {...menuItemProps}
          >
            {label}
          </MenuItem>
        ))}
    </Menu>
  );
};
export default Toolbar;
