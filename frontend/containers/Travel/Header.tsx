import moment from 'moment';
import Linkify from 'linkify-react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import {useTheme} from '@mui/material/styles';
import {useTranslation} from 'next-i18next';
import getMapsLink from '../../lib/getMapsLink';
import useMapStore from '../../stores/useMapStore';
import usePermissions from '../../hooks/usePermissions';
import useProfile from '../../hooks/useProfile';
import DetailsLink from '../DetailsLink';
import {TravelEntity} from '../../generated/graphql';
import {getFormatedPhoneNumber} from '../../lib/phoneNumbers';
import useEventStore from '../../stores/useEventStore';
import {getTravelName} from '../../lib/travels';

interface Props {
  travel: TravelEntity;
  toggleEditing: () => void;
}

const MAPBOX_CONFIGURED = process.env['MAPBOX_CONFIGURED'] || false;

const Header = (props: Props) => {
  const {travel, toggleEditing} = props;
  const theme = useTheme();
  const {t} = useTranslation();
  const {
    userPermissions: {canEditTravel, canSeeTravelDetails, canSeeFullName},
  } = usePermissions();
  const setFocusOnTravel = useMapStore(s => s.setFocusOnTravel);
  const {userId} = useProfile();
  const isReturnEvent = useEventStore(s => s.event?.isReturnEvent);
  const isUserTripCreator =
    userId && userId === travel.attributes.user?.data?.id;

  const passengersCount = travel?.attributes.passengers?.data.length || 0;
  const availableSeats = travel?.attributes.seats - passengersCount || 0;

  const tripHasValidCoordinates =
    travel.attributes.meeting_latitude && travel.attributes.meeting_longitude;

  return (
    <Box
      p={2}
      onClick={() => {
        setFocusOnTravel(travel);
        const mapElement = document?.getElementById('map');
        mapElement?.scrollIntoView({behavior: 'smooth'});
      }}
    >
      {canEditTravel(travel) && (
        <IconButton
          size="small"
          color="primary"
          sx={{
            position: 'absolute',
            top: theme.spacing(1),
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
      {!!travel.attributes.departureDate && (
        <Typography
          variant="overline"
          sx={{color: 'GrayText', textTransform: 'capitalize'}}
          id="TravelDeparture"
        >
          {moment(travel.attributes.departureDate).format('dddd LL')}{' '}
          {travel.attributes.departureTime}
        </Typography>
      )}
      <Typography variant="subtitle1">
        {getTravelName(travel, canSeeFullName())}
        {isUserTripCreator && (
          <Typography component="span">
            <Chip
              sx={{mx: 1}}
              label={t`generic.me`}
              variant="outlined"
              size="small"
            />
          </Typography>
        )}
      </Typography>

      {!!travel.attributes.phone_number && canSeeTravelDetails(travel) && (
        <Box sx={{marginTop: 2}}>
          <Typography variant="overline" sx={{color: 'GrayText'}}>
            {t('travel.fields.phone')}
          </Typography>
          <Typography variant="body1" id="TravelPhone">
            {getFormatedPhoneNumber({
              phone: travel.attributes.phone_number,
              phoneCountry: travel.attributes.phoneCountry,
            })}
          </Typography>
        </Box>
      )}
      {!!travel.attributes.meeting && (
        <Box sx={{marginTop: 2}}>
          <Typography variant="overline" sx={{color: 'GrayText'}}>
            {t(isReturnEvent ? 'travel.destination' : 'travel.meeting')}
          </Typography>
          <Typography variant="body1">
            <Link
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href={getMapsLink(travel.attributes.meeting)}
            >
              {travel.attributes.meeting}
            </Link>
          </Typography>
          {MAPBOX_CONFIGURED && !tripHasValidCoordinates && (
            <Typography
              variant="overline"
              color="warning.main"
            >{t`placeInput.noCoordinates`}</Typography>
          )}
        </Box>
      )}
      {!!travel.attributes.details && (
        <Box sx={{marginTop: 2}}>
          <Typography variant="overline" sx={{color: 'GrayText'}}>
            {t('travel.fields.details')}
          </Typography>

          <Typography
            variant="body1"
            sx={{whiteSpace: 'pre-line'}}
            onClick={e => e.stopPropagation()}
          >
            <Linkify options={{render: DetailsLink}}>
              {travel.attributes.details}
            </Linkify>
          </Typography>
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
        value={(passengersCount / travel?.attributes.seats) * 100}
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
