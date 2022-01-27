import {ReactNode} from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {ComponentPassengerPassenger} from '../../generated/graphql';

interface Props {
  passenger?: ComponentPassengerPassenger;
  button?: ReactNode;
  isVehicle?: boolean;
}

const Passenger = (props: Props) => {
  const {passenger, button, isVehicle} = props;
  const {t} = useTranslation();
  const classes = useStyles();

  const showLocation = isVehicle ? false : passenger.location

  if (passenger) {
    return (
      <>
        <ListItemText
          primary={passenger.name}
          secondary={showLocation}
        />
        {button}
      </>
    );
  } else
    return (
      <>
        <ListItemAvatar>
          <ListItemIcon color="disabled">
            <Icon>person</Icon>
          </ListItemIcon>
        </ListItemAvatar>
        <ListItemText
          primary={t('travel.passengers.empty')}
          classes={{
            root: classes.empty,
          }}
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
