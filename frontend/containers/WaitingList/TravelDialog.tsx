import moment from 'moment';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import {useTranslation} from 'react-i18next';
import {forwardRef} from 'react';
import getMapsLink from '../../lib/getMapsLink';
import ShareEvent from '../ShareEvent';
import {Passenger, TravelEntity, Travel} from '../../generated/graphql';

const PREFIX = 'TravelDialog';

const classes = {
  offset: `${PREFIX}-offset`,
  rtlBox: `${PREFIX}-rtlBox`,
  info: `${PREFIX}-info`,
  listItem: `${PREFIX}-listItem`,
  date: `${PREFIX}-date`,
  button: `${PREFIX}-button`,
  noTravel: `${PREFIX}-noTravel`,
  noTravelImage: `${PREFIX}-noTravelImage`,
  share: `${PREFIX}-share`
};

const StyledSlide = styled(Slide)((
  {
    theme
  }
) => ({
  [`& .${classes.offset}`]: {
    paddingTop: theme.spacing(7),
  },

  [`& .${classes.rtlBox}`]: {
    display: 'flex',
    padding: 0,
    margin: 0,
    direction: 'rtl',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      paddingBottom: theme.spacing(1),
    },
  },

  [`& .${classes.info}`]: {
    padding: theme.spacing(0, 4, 0, 0),
    width: '350px',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(0.5, 1),
      width: '100%',
      textAlign: 'left',
    },
  },

  [`& .${classes.listItem}`]: {
    display: 'flex',
    justifyContent: 'left',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      textAlign: 'center',
    },
  },

  [`& .${classes.date}`]: {
    textTransform: 'capitalize',
    padding: theme.spacing(0, 0, 0.5, 0),
  },

  [`& .${classes.button}`]: {
    padding: theme.spacing(1, 15),
    margin: theme.spacing(1),
  },

  [`& .${classes.noTravel}`]: {
    margin: '120px auto 0 auto',
    width: '330px',
    maxWidth: '100%',
    textAlign: 'center',
  },

  [`& .${classes.noTravelImage}`]: {
    width: 'calc(100% - 2px)',
    [theme.breakpoints.down('md')]: {
      width: 'calc(50% - 2px)',
    },
  },

  [`& .${classes.share}`]: {
    marginTop: theme.spacing(2),
    backgroundColor: '#fff',
  }
}));

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
          <IconButton onClick={onClose} color="inherit" size="large">
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
            className={classes.share}
            title={`Caroster ${eventName}`}
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
  return <StyledSlide direction="up" ref={ref} {...props} />;
});

export default TravelDialog;
