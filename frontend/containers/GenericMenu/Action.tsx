import {isValidElement} from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
const PREFIX = 'Action';

const classes = {
  divider: `${PREFIX}-divider`,
  textItem: `${PREFIX}-textItem`
};

const StyledTypography = styled(Typography)((
  {
    theme
  }
) => ({
  [`& .${classes.divider}`]: {
    margin: theme.spacing(1, 0),
  },

  [`&.${classes.textItem}`]: {
    margin: theme.spacing(1, 2),
    '&:focus': {outline: 0},
  }
}));

export type ActionType = {
  divider?: boolean;
  label: JSX.Element | string;
  id: string;
  onClick?: () => void;
};

interface Props {
  action: ActionType;
}

const Action = (props: Props): JSX.Element => {
  const {action} = props;
  const {divider, onClick, id, label, ...menuItemProps} = action;


  if (divider)
    return <Divider variant="fullWidth" className={classes.divider} />;
  else if (isValidElement(label)) return label;
  else if (onClick)
    return (
      <MenuItem id={id} onClick={onClick} {...menuItemProps}>
        {label}
      </MenuItem>
    );
  else
    return (
      <StyledTypography variant="body1" id={id} className={classes.textItem}>
        {label}
      </StyledTypography>
    );
};

export default Action;
