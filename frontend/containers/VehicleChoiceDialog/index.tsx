import {forwardRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import {useTranslation} from 'react-i18next';

const VehicleChoiceDialog = ({open, toggle, toggleNewTravel}) => {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={toggle}
      TransitionComponent={Transition}
    >
      <DialogTitle>{t('travel.vehicle.title')}</DialogTitle>
      <DialogContent dividers></DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          color="primary"
          variant="outlined"
          fullWidth
          onClick={() => {
            toggleNewTravel();
            toggle();
          }}
        >
          {t('travel.vehicle.add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  actions: {
    padding: theme.spacing(2, 3),
  },
}));

export default VehicleChoiceDialog;
