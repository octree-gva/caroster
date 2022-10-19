import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import {useTheme} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

interface Props {
  onClick: () => void;
  tabIndex?: number;
  disabled: boolean;
}

const AssignButton = (props: Props) => {
  const {onClick, tabIndex} = props;
  const theme = useTheme();

  const {t} = useTranslation();

  return (
    <ListItemSecondaryAction
      sx={{
        top: theme.spacing(3),
      }}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      <IconButton
        sx={{
          margin: theme.spacing(1, 0, 0, 0),
          borderRadius: 1,
          fontSize: theme.typography.subtitle1,
          padding: 0,
          lineHeight: 1.5,
          color: props.disabled ? 'black' : theme.palette.primary.main,
        }}
        disabled={props.disabled}
        size="large"
      >
        {t('passenger.actions.place')}
        <Icon>chevron_right</Icon>
      </IconButton>
    </ListItemSecondaryAction>
  );
};

export default AssignButton;
