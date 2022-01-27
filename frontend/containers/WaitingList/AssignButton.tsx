import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';

interface Props {
  onClick: () => void;
  tabIndex?: number;
}

const AssignButton = (props: Props) => {
  const {onClick, tabIndex} = props;
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <ListItemSecondaryAction  className={classes.action} onClick={onClick} tabIndex={tabIndex}>
      <IconButton className={classes.button} size="small" color="primary">
        {t('passenger.actions.place')}
        <Icon>chevron_right</Icon>
      </IconButton>
    </ListItemSecondaryAction>
  );
};

const useStyles = makeStyles(theme => ({
  action: {
    top: theme.spacing(3),
  },
  button: {
    borderRadius: theme.spacing(1),
  },
}));

export default AssignButton;
