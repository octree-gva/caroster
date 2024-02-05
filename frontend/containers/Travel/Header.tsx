import moment from 'moment';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import LinearProgress from '@mui/material/LinearProgress';
import {useTheme} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';
import getMapsLink from '../../lib/getMapsLink';
import useMapStore from '../../stores/useMapStore';
import {Travel} from '../../generated/graphql';
import usePermissions from '../../hooks/usePermissions';

interface Props {
  travel: Travel & {id: string};
  toggleEditing: () => void;
}

const Header = (props: Props) => {
  const {travel, toggleEditing} = props;
  const theme = useTheme();
  const {t} = useTranslation();
  const {
    userPermissions: {editableTravels},
  } = usePermissions();
  const {setFocusOnTravel, focusedTravel} = useMapStore();

  const passengersCount = travel?.passengers?.data.length || 0;
  const availableSeats = travel?.seats - passengersCount || 0;

  return (
    <Box
      sx={{padding: 2}}
      onClick={() => {
        setFocusOnTravel(focusedTravel === travel.id ? undefined : travel);
        const mapElement = document?.getElementById('map');
        mapElement?.scrollIntoView({behavior: 'smooth'});
      }}
    >
      {editableTravels.includes(travel.id) && (
        <IconButton
          size="small"
          color="primary"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: theme.spacing(1),
          }}
          onClick={e => {
            e.stopPropagation();
            toggleEditing();
          }}
          id="EditTravelBtn"
        >
          <TuneIcon />
        </IconButton>
      )}
      {!!travel.departure && (
        <Typography
          variant="overline"
          sx={{color: 'GrayText', textTransform: 'capitalize'}}
          id="TravelDeparture"
        >
          {moment(travel.departure).format('LLLL')}
        </Typography>
      )}
      <Typography variant="subtitle1">{travel.vehicleName}</Typography>
      {!!travel.phone_number && (
        <Box sx={{marginTop: 2}}>
          <Typography variant="overline" sx={{color: 'GrayText'}}>
            {t('travel.fields.phone')}
          </Typography>
          <Typography variant="body1" id="TravelPhone">
            {travel.phone_number}
          </Typography>
        </Box>
      )}
      {!!travel.meeting && (
        <Box sx={{marginTop: 2}}>
          <Typography variant="overline" sx={{color: 'GrayText'}}>
            {t('travel.fields.meeting_point')}
          </Typography>
          <Typography variant="body1">
            <Link
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href={getMapsLink(travel.meeting)}
            >
              {travel.meeting}
            </Link>
          </Typography>
        </Box>
      )}
      {!!travel.details && (
        <Box sx={{marginTop: 2}}>
          <Typography variant="overline" sx={{color: 'GrayText'}}>
            {t('travel.fields.details')}
          </Typography>
          <Typography variant="body1">{travel.details}</Typography>
        </Box>
      )}
      <LinearProgress
        sx={{
          width: 1,
          mt: 2,
          mb: 1,
          backgroundColor: 'LightGray',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'Gray',
          },
        }}
        value={(passengersCount / travel?.seats) * 100}
        variant="determinate"
      />
      <Box display="flex" justifyContent="space-between" sx={{width: 1}}>
        <Typography variant="body1" sx={{color: 'GrayText'}}>
          {t('passenger.assign.seats', {count: availableSeats})}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
