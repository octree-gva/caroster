import {isValidElement} from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import {Icon, ListItemIcon, ListItemText} from '@mui/material';

export type ActionType = {
  divider?: boolean;
  label: JSX.Element | string;
  icon?: string;
  id: string;
  onClick?: () => void;
};

interface Props {
  action: ActionType;
}

const Action = (props: Props): JSX.Element => {
  const {action} = props;
  const {divider, onClick, id, label, icon, ...menuItemProps} = action;

  if (divider) return <Divider variant="fullWidth" sx={{mt: 0, mb: 0}} />;
  else if (isValidElement(label)) return label;
  else if (onClick)
    return (
      <MenuItem id={id} onClick={onClick} {...menuItemProps}>
        <ListItemIcon>
          <Icon baseClassName="material-icons-outlined">{icon}</Icon>
        </ListItemIcon>
        <ListItemText>{label}</ListItemText>
      </MenuItem>
    );
  else
    return (
      <Typography variant="body1" id={id}>
        {label}
      </Typography>
    );
};

export default Action;
