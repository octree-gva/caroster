import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material/styles';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import Box from '@mui/material/Box';
import ShareEvent from '../ShareEvent';
import SupportCaroster from '../SupportCaroster';
import {Icon} from '@mui/material';
import usePermissions from '../../hooks/usePermissions';

interface Props {
  eventName: string;
  title: string;
  isCarosterPlus: string;
  showImage?: boolean;
  showTravelModal: () => void;
}

const NoCar = ({
  eventName,
  title,
  isCarosterPlus,
  showImage,
  showTravelModal,
}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const {uuid} = router.query;
  const {
    userPermissions: {canAddTravel},
  } = usePermissions();

  return (
    <Box my={4} mx="auto" pb={16} mt={15} maxWidth="100%" width={340}>
      <Typography variant="h6" align="center" color="textSecondary">
        {title}
      </Typography>

      {showImage && (
        <>
          {canAddTravel() && (
            <Box my={4} textAlign="center">
              <Button
                onClick={showTravelModal}
                aria-label="add-car"
                variant="contained"
                color="secondary"
                endIcon={<Icon>add</Icon>}
              >
                {t('travel.creation.title')}
              </Button>
            </Box>
          )}
          <Box
            component="img"
            sx={{
              display: 'block',
              margin: '0 auto',
              width: '100%',
              height: 'auto',

              [theme.breakpoints.down('md')]: {
                width: '50%',
              },
            }}
            src="/assets/car.png"
          />
        </>
      )}
      <Typography sx={{whiteSpace: 'pre-line', mt: 4}} color="textSecondary">
        {isCarosterPlus
          ? t('event.no_travel.plus.desc')
          : t('event.no_travel.desc')}
      </Typography>
      {!isCarosterPlus && (
        <ShareEvent
          color="primary"
          sx={{
            mt: 4,
            backgroundColor: '#fff',
          }}
          title={`Caroster ${eventName}`}
        />
      )}
      {isCarosterPlus && (
        <Box textAlign="center" width={1} mt={4}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => router.push(`/e/${uuid}/alerts`)}
          >
            {t('event.no_travel.plus.action')}
          </Button>
        </Box>
      )}
      <Box mt={4} display="flex" justifyContent="center">
        <SupportCaroster />
      </Box>
    </Box>
  );
};

export default NoCar;
