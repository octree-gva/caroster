import React from 'react';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CarDialog = ({cars, open, onClose, onSelect}) => {
  const classes = useStyles();
  const {t} = useTranslation();

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
          {cars?.map((car, i) => (
            <ListItem
              key={i}
              button
              divider
              disabled={car.passengers?.length === car.seats}
              onClick={() => onSelect(car)}
            >
              <ListItemText
                primary={car.name}
                secondary={t('passenger.creation.seats', {
                  seats: `${car.passengers ? car.passengers.length : 0} / ${
                    car.seats
                  }`,
                })}
              />
            </ListItem>
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
