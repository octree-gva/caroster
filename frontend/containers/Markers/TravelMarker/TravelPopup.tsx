import moment from 'moment';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import {TravelEntity} from '../../../generated/graphql';
import {Popup} from 'react-leaflet';
import {useTranslation} from 'next-i18next';
import getMapsLink from '../../../lib/getMapsLink';
import {getFormatedPhoneNumber} from '../../../lib/phoneNumbers';
import usePermissions from '../../../hooks/usePermissions';
import useEventStore from '../../../stores/useEventStore';
import {getTravelName} from '../../../lib/travels';

interface Props {
  travel: TravelEntity;
}

const TravelPopup = ({travel}: Props) => {
  const {t} = useTranslation();
  const {
    userPermissions: {canSeeTravelDetails, canSeeFullName},
  } = usePermissions();
  const isReturnEvent = useEventStore(s => s.event?.isReturnEvent);
  return (
    <Popup>
      <Card sx={{p: 2, width: '350px', maxWidth: '100%', cursor: 'pointer'}}>
        {!!travel.attributes.departureDate && (
          <Typography variant="overline" color="Graytext" id="TravelDeparture">
            {moment(travel.attributes.departureDate).format('dddd LL')}{' '}
            {travel.attributes.departureTime || ''}
          </Typography>
        )}
        <Box>
          <Typography variant="h5">
            {getTravelName(travel, canSeeFullName())}
          </Typography>
        </Box>
        {!!travel.attributes.phone_number && canSeeTravelDetails(travel) && (
          <Box sx={{marginTop: 2}}>
            <Typography variant="overline" color="GrayText">
              {t('travel.fields.phone')}
            </Typography>
            <Typography variant="body1">
              {getFormatedPhoneNumber({
                phone: travel.attributes.phone_number,
                phoneCountry: travel.attributes.phoneCountry,
              })}
            </Typography>
          </Box>
        )}
        {!!travel.attributes.meeting && (
          <Box sx={{marginTop: 2}}>
            <Typography variant="overline" color="GrayText">
              {t(isReturnEvent ? 'travel.destination' : 'travel.meeting')}
            </Typography>
            <Typography variant="body1" color="primary">
              <Link
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href={getMapsLink(travel.attributes.meeting)}
                onClick={e => e.stopPropagation()}
                sx={{color: 'primary.main'}}
              >
                {travel.attributes.meeting}
              </Link>
            </Typography>
          </Box>
        )}
      </Card>
    </Popup>
  );
};
export default TravelPopup;
