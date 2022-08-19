import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import ShareEvent from '../ShareEvent';

interface Props {
  eventName: string;
  title: string;
  image?: boolean;
}

const url = typeof window !== 'undefined' ? window.location.href : '';

const NoCar = ({eventName, title, image}: Props) => {
  const classes = useStyles({image});
  const {t} = useTranslation();

  return (
    <Box className={classes.noTravel}>
      <Typography variant="h5">{title}</Typography>
      <img className={classes.noTravelImage} src="/assets/car.png" />
      <Typography>{t('event.no_travel.desc')}</Typography>
      <ShareEvent
        color="primary"
        className={classes.share}
        title={`Caroster ${eventName}`}
        url={`${url}`}
      />
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  noTravel: ({image}) => ({
    margin: `${theme.spacing(4)}px auto`,
    marginTop: image ? 0 : theme.spacing(8),
    width: '280px',
    maxWidth: '100%',
    paddingBottom: theme.spacing(16),
    textAlign: 'center',
  }),
  noTravelImage: ({image}) => ({
    width: image ? '100%' : 0,
    height: image ? 'auto' : theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      width: image ? '50%' : 0,
    },
  }),
  share: {
    marginTop: theme.spacing(6),
    backgroundColor: '#fff',
  },
}));

export default NoCar;
