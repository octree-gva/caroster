import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddToMyEventDialog = ({event, open, onClose}) => {
  const {t} = useTranslation();
  const history = useHistory();
  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={onClose}>
      <DialogContent>
        <DialogTitle>
          {t('event.add_to_my_events.title', {eventName: event.name})}
        </DialogTitle>
        <DialogContentText
          dangerouslySetInnerHTML={{
            __html: t('event.add_to_my_events.text_html', {
              eventName: event.name,
            }),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} id="AddToMyEventCancel">
          {t('event.add_to_my_events.cancel')}
        </Button>
        <Button
          id="AddToMyEventLogin"
          onClick={() => {
            history.push({
              pathName: '/login',
              state: {event: event.id},
            });
          }}
        >
          {t('event.add_to_my_events.login')}
        </Button>
        <Button
          id="AddToMyEventRegister"
          onClick={() => {
            history.push({
              pathName: '/register',
              state: {event: event.id},
            });
          }}
          color="primary"
        >
          {t('event.add_to_my_events.register')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToMyEventDialog;
