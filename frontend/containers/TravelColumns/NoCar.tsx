import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import Copylink from '../../components/CopyLink';
import useToastStore from '../../stores/useToastStore';

interface Props {
  eventName: string;
  title: string;
  image?: boolean;
}

const NoCar = ({eventName, title, image}: Props) => {
  const classes = useStyles({image});
  const {t} = useTranslation();
  const addToast = useToastStore(s => s.addToast);

  return (
    <Box className={classes.noTravel}>
      <Typography variant="h5">{title}</Typography>
      <img className={classes.noTravelImage} src="/assets/car.png" />
      <Typography>{t('event.no_travel.desc')}</Typography>
      <Copylink
        color="primary"
        className={classes.share}
        buttonText={t('event.fields.share')}
        title={`Caroster ${eventName}`}
        url={`${window.location.href}`}
        onShare={() => addToast(t('event.actions.copied'))}
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
  }),
  share: {
    marginTop: theme.spacing(6),
    backgroundColor: theme.palette.background.default
  },
}));

export default NoCar;
