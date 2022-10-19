import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RemoveDialog = ({text, open, onClose, onRemove}) => {
  const {t} = useTranslation();

  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={onClose}>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} id="CarRemoveCancel">
          {t('generic.cancel')}
        </Button>
        <Button
          id="CarRemoveConfirm"
          onClick={() => {
            onRemove();
            onClose();
          }}
        >
          {t('generic.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveDialog;
