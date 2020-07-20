import React from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';

const Passenger = ({passenger, button}) => {
  const {t} = useTranslation();
  const classes = useStyles();

  return !!passenger ? (
    <>
      <ListItemText primary={passenger} />
      {button}
    </>
  ) : (
    <>
      <ListItemAvatar>
        <ListItemIcon color="disabled">
          <Icon>person</Icon>
        </ListItemIcon>
      </ListItemAvatar>
      <ListItemText
        classes={{
          root: classes.empty,
        }}
        primary={t('car.passengers.empty')}
      />
    </>
  );
};

const useStyles = makeStyles(theme => ({
  empty: {
    color: theme.palette.text.secondary,
  },
}));

export default Passenger;
