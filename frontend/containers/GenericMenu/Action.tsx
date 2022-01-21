import {ReactNode} from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';

type ActionType = {
  divider?: boolean;
  isComponentLabel?: boolean;
  label: ReactNode | string;
  id: string;
  onClick: () => void;
};

interface Props {
  action: ActionType;
}

const Action = (props: Props) => {
  const {action} = props;
  const {
    divider,
    onClick,
    id,
    label,
    isComponentLabel,
    ...menuItemProps
  } = action;
  const classes = useStyles();

  if (divider)
    return <Divider variant="fullWidth" className={classes.divider} />;
  else if (isComponentLabel) return action.label;
  else if (onClick)
    return (
      <MenuItem id={id} onClick={onClick} {...menuItemProps}>
        {label}
      </MenuItem>
    );
  else
    return (
      <Typography variant="body1" id={id} className={classes.textItem}>
        {label}
      </Typography>
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

export default Action;
