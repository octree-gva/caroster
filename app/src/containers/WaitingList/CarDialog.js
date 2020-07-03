import React, {useMemo} from 'react';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {useStrapi} from 'strapi-react-context';
import {useEvent} from '../../contexts/Event';

const sortCars = (a, b) => {
  const dateA = new Date(a.departure).getTime();
  const dateB = new Date(b.departure).getTime();
  if (dateA === dateB) return new Date(a.createdAt) - new Date(b.createdAt);
  else return dateA - dateB;
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CarDialog = ({open, onClose, onSelect}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const strapi = useStrapi();
  const {event} = useEvent();

  const cars = useMemo(
    () =>
      strapi.stores.cars
        ?.filter(car => car?.event?.id === event?.id)
        .sort(sortCars),
    [strapi.stores.cars, event]
  );

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar>
        <Toolbar>
          <IconButton onClick={onClose} color="inherit">
            <Icon>arrow_back_ios</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.offset}>
        <List>
          {cars?.map(car => (
            <>
              <ListItem
                button
                disabled={car.passengers?.length === car.seats}
                onClick={() => onSelect(car)}
              >
                <ListItemText
                  primary={car.name}
                  secondary={t('passenger.creation.seats', {
                    seats: `${car.passengers?.length} / ${car.seats}`,
                  })}
                />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </div>
    </Dialog>
  );
};

const useStyles = makeStyles(theme => ({
  offset: {
    paddingTop: theme.spacing(7),
  },
}));

export default CarDialog;
