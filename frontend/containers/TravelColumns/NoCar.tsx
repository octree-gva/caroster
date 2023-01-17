import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {useTranslation} from 'react-i18next';
import ShareEvent from '../ShareEvent';

interface Props {
  eventName: string;
  title: string;
  image?: boolean;
}

const url = typeof window !== 'undefined' ? window.location.href : '';

const NoCar = ({eventName, title, image}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        margin: `${theme.spacing(4)} auto`,
        marginTop: image ? 0 : theme.spacing(8),
        width: '280px',
        maxWidth: '100%',
        paddingBottom: theme.spacing(16),
        textAlign: 'center',
      }}
    >
      <Typography variant="h5">{title}</Typography>
      <Box
        component="img"
        sx={{
          width: image ? '100%' : 0,
          height: image ? 'auto' : theme.spacing(6),
          [theme.breakpoints.down('md')]: {
            width: image ? '50%' : 0,
          },
        }}
        src="/assets/car.png"
      />
      <Typography>{t('event.no_travel.desc')}</Typography>
      <ShareEvent
        color="primary"
        sx={{marginTop: theme.spacing(6), backgroundColor: '#fff'}}
        title={`Caroster ${eventName}`}
      />
    </Box>
  );
};

export default NoCar;
