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
import {forwardRef} from 'react';
import getMapsLink from '../../lib/getMapsLink';
import ShareEvent from '../ShareEvent';
import {Passenger, TravelEntity, Travel} from '../../generated/graphql';

interface Props {
  eventName: string;
  travels: Array<TravelEntity>;
  passenger: Passenger;
  open: boolean;
  onClose: () => void;
  onSelect: (travel: Travel & {id: string}) => void;
}

const TravelDialog = ({
  eventName,
  travels,
  passenger,
  open,
  onClose,
  onSelect,
}: Props) => {
  const classes = useStyles();
  const {t} = useTranslation();

  const availableTravels = travels?.filter(
    ({attributes}) =>
      attributes.passengers &&
      attributes?.seats > attributes.passengers.data.length
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
          <Typography variant="h5">
            {t('passenger.creation.available_cars')}
          </Typography>
        </Toolbar>
      </AppBar>
      {(availableTravels.length === 0 && (
        <Box className={classes.noTravel}>
          <Typography variant="h5">
            {t('passenger.creation.no_travel.title')}
          </Typography>
          <img className={classes.noTravelImage} src="/assets/car.png" />
          <Typography>
            {t('passenger.creation.no_travel.desc', {name: passenger?.name})}
          </Typography>
          <ShareEvent
            color="primary"
            className={classes.share}
            title={`Caroster ${eventName}`}
            url={`${typeof window !== 'undefined' ? window.location.href : ''}`}
          />
        </Box>
      )) || (
        <div className={classes.offset}>
          <List disablePadding>
            {availableTravels.map(({id, attributes}, i) => {
              const travel = {id, ...attributes};
              const passengersCount = travel?.passengers?.data.length || 0;
              const counter = `${passengersCount} / ${travel?.seats || 0}`;
              return (
                <ListItem key={i} divider className={classes.listItem}>
                  <Box className={classes.rtlBox}>
                    <Box className={classes.info}>
                      <Typography variant="subtitle1" className={classes.date}>
                        {t('passenger.creation.departure')}
                        {moment(travel.departure).format('LLLL')}
                      </Typography>
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href={getMapsLink(travel.meeting)}
                        onClick={e => e.preventDefault}
                      >
                        {travel.meeting}
                      </Link>
                    </Box>
                    <Box className={classes.info}>
                      <Typography variant="h6">{travel.vehicleName}</Typography>
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
      )}
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
    width: '350px',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5, 1),
      width: '100%',
      textAlign: 'left',
    },
  },
  listItem: {
    display: 'flex',
    justifyContent: 'left',
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
    margin: theme.spacing(1),
  },
  noTravel: {
    margin: '120px auto 0 auto',
    width: '330px',
    maxWidth: '100%',
    textAlign: 'center',
  },
  noTravelImage: {
    width: 'calc(100% - 2px)',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(50% - 2px)',
    },
  },
  share: {
    marginTop: theme.spacing(2),
    backgroundColor: '#fff',
  },
}));

export default TravelDialog;
