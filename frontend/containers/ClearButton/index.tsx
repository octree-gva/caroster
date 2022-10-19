import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

interface Props {
  onClick?: () => void;
  icon: string;
  tabIndex?: number;
}

const ClearButton = (props: Props) => {
  const {icon, onClick, tabIndex} = props;

  if (onClick)
    return (
      <ListItemSecondaryAction>
        <IconButton size="small" color="primary" onClick={onClick} tabIndex={tabIndex}>
          <Icon>{icon}</Icon>
        </IconButton>
      </ListItemSecondaryAction>
    );

  return <Icon color="primary">{icon}</Icon>;
};

export default ClearButton;
