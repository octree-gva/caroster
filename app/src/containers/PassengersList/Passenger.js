import React from 'react';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';

const Passenger = ({passenger, button}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  return !!passenger ? (
    <Box display="flex" flexDirection="row" alignItems="center" px={2} py={1}>
      <Typography variant="body2" className={classes.name}>
        {passenger}
      </Typography>
      {button}
    </Box>
  ) : (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      px={2}
      py={1}
      minHeight={46}
    >
      <Icon color="disabled" className={classes.icon}>
        person
      </Icon>
      <Typography variant="body2">{t('car.passengers.empty')}</Typography>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  name: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

export default Passenger;
