import moment from 'moment';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import useMapStore from '../../stores/useMapStore';
import getMapsLink from '../../lib/getMapsLink';
import {Travel} from '../../generated/graphql';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useTranslation} from 'react-i18next';
import theme from '../../theme';

interface Props {
  travel: Travel & {id: string};
}

const TravelPopup = ({travel}: Props) => {
  const {t} = useTranslation();
  const {setFocusOnTravel} = useMapStore();
  return (
    <Card>
      <Typography variant="h5">
        <Button
          onClick={() => {
            setFocusOnTravel(travel);
            const travelCard = document?.getElementById(travel.id);
            travelCard.scrollIntoView({behavior: 'smooth'});
          }}
        >
          {travel.vehicleName}
        </Button>
      </Typography>
      {!!travel.meeting && (
        <Box sx={{marginTop: 2}}>
          <Typography variant="subtitle2">
            {t('travel.fields.meeting_point')}
          </Typography>
          <Typography variant="body2">
            <Link
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href={getMapsLink(travel.meeting)}
              sx={{color: theme.palette.primary.main}}
            >
              {travel.meeting}
            </Link>
          </Typography>
        </Box>
      )}
      {!!travel.departure && (
        <Typography variant="overline" id="TravelDeparture">
          {moment(travel.departure).format('LLLL')}
        </Typography>
      )}
    </Card>
  );
};
export default TravelPopup;
