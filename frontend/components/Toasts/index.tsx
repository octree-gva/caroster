import {makeStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import useToastStore from '../../stores/useToastStore';

const Toasts = () => {
  const toast = useToastStore(s => s.toast);
  const action = useToastStore(s => s.action);
  const clearToast = useToastStore(s => s.clearToast);
  const classes = useStyles();

  return (
    <Snackbar
      className={classes.withMobile}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={6000}
      open={!!toast}
      message={toast}
      onClose={clearToast}
      action={action}
    />
  );
};

const useStyles = makeStyles(theme => ({
  withMobile: {
    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(8),
    },
  }
}));

export default Toasts;
