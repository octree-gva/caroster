import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

const Header = ({car, toggleEditing}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  return (
    <div className={classes.header}>
      <IconButton
        size="small"
        color="primary"
        className={classes.editBtn}
        onClick={toggleEditing}
        id="EditCarBtn"
      >
        <Icon>edit</Icon>
      </IconButton>
      {!!car.departure && (
        <Typography variant="overline" id="CarDeparture">
          {moment(car.departure).format('LLLL')}
        </Typography>
      )}
      <Typography variant="h5" id="CarName">
        {car.name}
      </Typography>
      {!!car.phone_number && (
        <div className={classes.section}>
          <Typography variant="subtitle2">{t('car.fields.phone')}</Typography>
          <Typography variant="body2" id="CarPhone">
            {car.phone_number}
          </Typography>
        </div>
      )}
      {!!car.meeting && (
        <div className={classes.section}>
          <Typography variant="subtitle2">
            {t('car.fields.meeting_point')}
          </Typography>
          <Typography variant="body2" id="CarMeeting">
            {car.meeting}
          </Typography>
        </div>
      )}
      {!!car.details && (
        <div className={classes.section}>
          <Typography variant="subtitle2">{t('car.fields.details')}</Typography>
          <Typography variant="body2" id="CarDetails">
            {car.details}
          </Typography>
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(2),
  },
  editBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: theme.spacing(1),
    zIndex: theme.zIndex.speedDial,
  },
  section: {
    marginTop: theme.spacing(2),
  },
}));

export default Header;
