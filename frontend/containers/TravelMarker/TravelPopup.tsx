import moment from 'moment';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import {TravelEntity} from '../../generated/graphql';
import {Popup} from 'react-leaflet';
import {useTranslation} from 'react-i18next';
import getMapsLink from '../../lib/getMapsLink';

interface Props {
  travel: TravelEntity;
}

const TravelPopup = ({travel}: Props) => {
  const {t} = useTranslation();
  return (
    <Popup>
      <Card sx={{p: 2, width: '350px', maxWidth: '100%', cursor: 'pointer'}}>
        {!!travel.attributes.departure && (
          <Typography variant="overline" color="Graytext" id="TravelDeparture">
            {moment(travel.attributes.departure).format('LLLL')}
          </Typography>
        )}
        <Box>
          <Typography variant="h5">{travel.attributes.vehicleName}</Typography>
        </Box>
        {!!travel.attributes.phone_number && (
          <Box sx={{marginTop: 2}}>
            <Typography variant="overline" color="GrayText">
              {t('travel.fields.phone')}
            </Typography>
            <Typography variant="body1">
              {travel.attributes.phone_number}
            </Typography>
          </Box>
        )}
        {!!travel.attributes.meeting && (
          <Box sx={{marginTop: 2}}>
            <Typography variant="overline" color="GrayText">
              {t('travel.fields.meeting_point')}
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
