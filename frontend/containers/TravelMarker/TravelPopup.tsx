import moment from 'moment';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import {Travel} from '../../generated/graphql';
import {Popup} from 'react-leaflet';
import {useTranslation} from 'react-i18next';
import useMapStore from '../../stores/useMapStore';
import getMapsLink from '../../lib/getMapsLink';

interface Props {
  travel: Travel & {id: string};
}

const TravelPopup = ({travel}: Props) => {
  const {t} = useTranslation();
  const {setFocusOnTravel} = useMapStore();
  return (
    <Popup>
      <Card
        sx={{p: 2, width: '350px', maxWidth: '100%', cursor: 'pointer'}}
        onClick={() => {
          setFocusOnTravel(travel);
          const travelCard = document?.getElementById(travel.id);
          travelCard?.scrollIntoView({behavior: 'smooth'});
        }}
      >
        {!!travel.departure && (
          <Typography variant="overline" color="Graytext" id="TravelDeparture">
            {moment(travel.departure).format('LLLL')}
          </Typography>
        )}
        <Box>
          <Typography variant="h5">{travel.vehicleName}</Typography>
        </Box>
        {!!travel.phone_number && (
          <Box sx={{marginTop: 2}}>
            <Typography variant="overline" color="GrayText">
              {t('travel.fields.phone')}
            </Typography>
            <Typography variant="body1">{travel.phone_number}</Typography>
          </Box>
        )}
        {!!travel.meeting && (
          <Box sx={{marginTop: 2}}>
            <Typography variant="overline" color="GrayText">
              {t('travel.fields.meeting_point')}
            </Typography>
            <Typography variant="body1" color="primary">
              <Link
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href={getMapsLink(travel.meeting)}
                onClick={e => e.stopPropagation()}
                sx={{color: 'primary.main'}}
              >
                {travel.meeting}
              </Link>
            </Typography>
          </Box>
        )}
      </Card>
    </Popup>
  );
};
export default TravelPopup;
