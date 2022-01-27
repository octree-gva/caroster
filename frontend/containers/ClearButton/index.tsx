import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

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
