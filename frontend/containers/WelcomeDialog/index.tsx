import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import CardMedia from '@mui/material/CardMedia';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import useTourStore from '../../stores/useTourStore';

const PREFIX = 'WelcomeDialog';

const classes = {
  media: `${PREFIX}-media`
};

const StyledDialog = styled(Dialog)({
  [`& .${classes.media}`]: {
    height: 240,
  },
});

const WelcomeDialog = () => {
  const {t} = useTranslation();
  const showWelcome = useTourStore(s => s.showWelcome);
  const setTour = useTourStore(s => s.setTour);


  const onStartTour = () =>
    setTour({showWelcome: false, run: true, step: 0, prev: -1});

  const onCancel = () => setTour({showWelcome: false}); 

  return (
    <StyledDialog open={showWelcome} fullWidth maxWidth="xs">
      <CardMedia
        className={classes.media}
        image="/assets/Caroster_Octree_Social.jpg"
      />
      <DialogContent>
        <DialogContentText align="center">
          <Typography variant="h6" color="primary">
            {t('tour.welcome.title')}
          </Typography>
          <Typography color="textPrimary">{t('tour.welcome.text')}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} id="TourCancel">
          {t('tour.welcome.nope')}
        </Button>
        <Button
          onClick={onStartTour}
          id="TourConfirm"
          variant="contained"
          color="primary"
        >
          {t('tour.welcome.onboard')}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default WelcomeDialog;
