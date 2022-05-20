import {ReactNode} from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {Passenger as PassengerType} from '../../generated/graphql';
import useProfile from '../../hooks/useProfile';
import Chip from '@material-ui/core/Chip';

interface Props {
  passenger?: PassengerType;
  button?: ReactNode;
  isVehicle?: boolean;
}

const Passenger = (props: Props) => {
  const {passenger, button, isVehicle} = props;
  const {t} = useTranslation();
  const classes = useStyles();
  const {user} = useProfile();

  const isUser = user && `${user.id}` === passenger?.user?.id;
  const showLocation = isVehicle ? false : passenger.location;

  if (passenger) {
    return (
      <>
        <ListItemText
          primary={
            <>
              {passenger.name}
              {isUser && (
                <Chip
                  className={classes.me}
                  label={t('generic.me')}
                  variant="outlined"
                />
              )}
            </>
          }
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
  me: {
    marginLeft: theme.spacing(2),
  },
}));

export default Passenger;
