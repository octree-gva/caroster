import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const GenericMenu = ({anchorEl, setAnchorEl, actions = []}) => {
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
          ({onClick, id, label, divider = false, ...menuItemProps}, idx) => {
            if (divider)
              return (
                <Divider
                  key={idx}
                  variant="fullWidth"
                  className={classes.divider}
                />
              );
            if (onClick)
              return (
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
              );
            else
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
          }
        )}
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
export default GenericMenu;
