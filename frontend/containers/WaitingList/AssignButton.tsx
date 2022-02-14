import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';

interface Props {
  onClick: () => void;
  tabIndex?: number;
  disabled: boolean
}

const AssignButton = (props: Props) => {
  const {onClick, tabIndex} = props;
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <ListItemSecondaryAction  className={classes.action} onClick={onClick} tabIndex={tabIndex}>
      <IconButton className={classes.button} disabled={props.disabled}>
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
  button: ({disabled}) => ({
    borderRadius: theme.spacing(1),
    margin: theme.spacing(1, 0, 0, 0),
    padding: 0,
    fontSize: '1rem',
    lineHeight: 1.5,
    color: disabled ? 'black' : theme.palette.primary.main
  }),
}));

export default AssignButton;
