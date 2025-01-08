import {forwardRef} from 'react';
import {styled} from '@mui/material/styles';
import {useRouter} from 'next/router';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Icon from '@mui/material/Icon';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Trans, useTranslation} from 'next-i18next';
import useAddToEvents from '../../hooks/useAddToEvents';

const PREFIX = 'AddToMyEventDialog';

const classes = {
  close: `${PREFIX}-close`,
};

const StyledSlide = styled(Slide)(({theme}) => ({
  [`& .${classes.close}`]: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(0.5),
  },
}));

const AddToMyEventDialog = ({event, open, onClose}) => {
  const {t} = useTranslation();
  const router = useRouter();

  const {addToEvent} = useAddToEvents();

  const onRedirect = path => {
    addToEvent(event.id);
    router.push(path);
  };

  if (!event) return null;

  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={onClose}>
      <IconButton onClick={onClose} className={classes.close} size="large">
        <Icon>close</Icon>
      </IconButton>
      <DialogTitle>
        {t('event.add_to_my_events.title', {eventName: event.name})}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Trans
            i18nKey="event.add_to_my_events.text"
            values={{eventName: event.name}}
            components={{bold: <strong />}}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          id="AddToMyEventLogin"
          onClick={() => onRedirect(`/auth/login`)}
        >
          {t('event.add_to_my_events.login')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Transition = forwardRef(function Transition(props, ref) {
  return <StyledSlide direction="up" ref={ref} {...props} />;
});

export default AddToMyEventDialog;
