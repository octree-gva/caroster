import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {makeStyles} from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import Icon from '@material-ui/core/Icon';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {useTranslation} from 'react-i18next';
import {Redirect} from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddToMyEventDialog = ({event, open, onClose}) => {
  const {t} = useTranslation();
  const [redirectTo, setRedirectTo] = useState(null);
  const classes = useStyles();
  if (!event) return null;

  if (redirectTo) {
    return (
      <Redirect push to={{pathname: redirectTo, state: {event: event.id}}} />
    );
  }

  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={onClose}>
      <IconButton onClick={onClose} className={classes.close}>
        <Icon>close</Icon>
      </IconButton>
      <DialogTitle>
        {t('event.add_to_my_events.title', {eventName: event.name})}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          dangerouslySetInnerHTML={{
            __html: t('event.add_to_my_events.text_html', {
              eventName: event.name,
            }),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button id="AddToMyEventLogin" onClick={() => setRedirectTo('/login')}>
          {t('event.add_to_my_events.login')}
        </Button>
        <Button
          id="AddToMyEventRegister"
          onClick={() => setRedirectTo('/register')}
          color="primary"
        >
          {t('event.add_to_my_events.register')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles(theme => ({
  close: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(0.5),
  },
}));
export default AddToMyEventDialog;
