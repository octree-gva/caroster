import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RemoveDialog = ({open, toggle, onRemove}) => {
  const {t} = useTranslation();

  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={toggle}>
      <DialogContent>
        <DialogContentText>{t('car.actions.remove_alert')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle} id="CarRemoveCancel">
          {t('generic.cancel')}
        </Button>
        <Button
          id="CarRemoveConfirm"
          onClick={() => {
            onRemove();
            toggle();
          }}
        >
          {t('generic.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveDialog;
