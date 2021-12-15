import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import CardMedia from '@material-ui/core/CardMedia';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import useTourStore from '../../stores/useTourStore';

const WelcomeDialog = () => {
  const {t} = useTranslation();
  const showWelcome = useTourStore(s => s.showWelcome);
  const setTour = useTourStore(s => s.setTour);
  const classes = useStyles();

  const onStartTour = () =>
    setTour({showWelcome: false, run: true, step: 0, prev: -1});

  const onCancel = () => setTour({showWelcome: false});

  return (
    <Dialog open={showWelcome} fullWidth maxWidth="xs">
      <CardMedia
        className={classes.media}
        image="/assets/Caroster_Octree_Social.jpg"
      />
      <DialogContent>
        <DialogContentText align="center">
          <Typography variant="h6">{t('tour.welcome.title')}</Typography>
          {t('tour.welcome.text')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} id="TourCancel">
          {t('tour.welcome.nope')}
        </Button>
        <Button onClick={onStartTour} id="TourConfirm">
          {t('tour.welcome.onboard')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles({
  media: {
    height: 240,
  },
});

export default WelcomeDialog;
