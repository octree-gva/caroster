import {forwardRef} from 'react';
import moment from 'moment';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';

const TravelDialog = ({travels, open, onClose, onSelect}) => {
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
          <Typography variant="h5">
            {t('passenger.creation.available_cars')}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.offset}>
        <List disablePadding>
          {travels?.map((travel, i) => {
            const passengers = travel.passengers ? travel.passengers.length : 0;
            const counter = `${passengers} / ${travel?.vehicle?.seats}`;
            return (
              <ListItem
                key={i}
                divider
                disabled={passengers === travel.seats}
                className={classes.listItem}
              >
                <Box className={classes.rtlBox}>
                  <Box className={classes.info}>
                    <Typography variant="subtitle1" className={classes.date}>
                      {t('passenger.creation.departure')}
                      {moment(travel.departure).format('LLLL')}
                    </Typography>
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        travel.meeting
                      )}`}
                      onClick={e => e.preventDefault}
                    >
                      {travel.meeting}
                    </Link>
                  </Box>
                  <Box className={classes.info}>
                    <Typography variant="h6">{travel.vehicle?.name}</Typography>
                    <Typography variant="body2">
                      {t('passenger.creation.seats', {seats: counter})}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => onSelect(travel)}
                  className={classes.button}
                >
                  {t('passenger.creation.assign')}
                </Button>
              </ListItem>
            );
          })}
        </List>
      </div>
    </Dialog>
  );
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  offset: {
    paddingTop: theme.spacing(7),
  },
  rtlBox: {
    display: 'flex',
    padding: 0,
    margin: 0,
    direction: 'rtl',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      paddingBottom: theme.spacing(1),
    },
  },
  info: {
    padding: theme.spacing(0, 4, 0, 0),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5, 1),
      width: '100%',
      textAlign: 'left',
    },
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      textAlign: 'center',
    },
  },
  date: {
    textTransform: 'capitalize',
    padding: theme.spacing(0, 0, 0.5, 0),
  },
  button: {
    padding: theme.spacing(1, 15),
  },
}));

export default TravelDialog;
