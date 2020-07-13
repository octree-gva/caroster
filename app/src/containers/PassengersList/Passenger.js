import React from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import {useTranslation} from 'react-i18next';

const Passenger = ({passenger, button}) => {
  const {t} = useTranslation();
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
      <ListItemText primary={t('car.passengers.empty')} />
    </>
  );
};

export default Passenger;
