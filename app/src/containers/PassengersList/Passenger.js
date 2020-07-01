import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {useTranslation} from 'react-i18next';

const Passenger = ({passenger, removePassenger}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  if (!!passenger)
    return (
      <div className={classes.item}>
        <Typography variant="body2" className={classes.name}>
          {passenger}
        </Typography>
        <IconButton edge="end" size="small" onClick={removePassenger}>
          <Icon>close</Icon>
        </IconButton>
      </div>
    );
  else return <div className={classes.item}>{t('car.passengers.empty')}</div>;
};

const useStyles = makeStyles(theme => ({
  item: {
    padding: theme.spacing(1, 2),
    display: 'flex',
    alignItems: 'center',
    height: '46px',
  },
  name: {
    flexGrow: 1,
  },
}));

export default Passenger;
