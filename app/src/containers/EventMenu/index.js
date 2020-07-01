import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const EventMenu = ({ anchorEl, setAnchorEl, actions = [] }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
    >
      {actions &&
        actions.map((action, idx) => (
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
