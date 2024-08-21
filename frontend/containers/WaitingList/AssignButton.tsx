import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import {useTheme} from '@mui/material/styles';
import {useTranslation} from 'next-i18next';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

interface Props {
  onClick: () => void;
  tabIndex?: number;
  disabled?: boolean;
}

const AssignButton = (props: Props) => {
  const {onClick, tabIndex} = props;
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <ListItemSecondaryAction onClick={onClick} tabIndex={tabIndex}>
      <IconButton
        sx={{
          borderRadius: 1,
          fontSize: theme.typography.button,
          padding: 0,
          color: props.disabled ? 'black' : theme.palette.primary.main,
        }}
        disabled={props.disabled}
      >
        {t('passenger.actions.place')}
        <Icon>chevron_right</Icon>
      </IconButton>
    </ListItemSecondaryAction>
  );
};

export default AssignButton;
