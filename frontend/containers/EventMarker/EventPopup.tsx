import moment from 'moment';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import {useTranslation} from 'react-i18next';
import {Popup} from 'react-leaflet';
import getMapsLink from '../../lib/getMapsLink';
import {Event} from '../../generated/graphql';

interface Props {
  event: Event & {id: string};
}

const EventPopup = ({event}: Props) => {
  const {t} = useTranslation();

  return (
    <Popup>
      <Card sx={{p: 2, width: '350px', maxWidth: '100%'}}>
        <Box>
          <Typography
            variant="h3"
            color="primary"
            sx={{cursor: 'pointer', display: 'inline-block'}}
          >
            <Link
              color="inherit"
              href={`/e/${event.uuid}/details`}
              sx={{textDecoration: 'none'}}
            >
              {event.name}
            </Link>
          </Typography>
        </Box>
        {!!event.date && (
          <Box sx={{marginTop: 2}}>
            <Typography variant="overline" color="GrayText">
              {t('event.fields.date')}
            </Typography>
            <Typography variant="body1">
              {moment(event.date).format('LLLL')}
            </Typography>
          </Box>
        )}
        {!!event.address && (
          <Box sx={{marginTop: 2}}>
            <Typography variant="overline" color="GrayText">
              {t('event.fields.address')}
            </Typography>
            <Typography variant="body1" color="primary">
              <Link
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href={getMapsLink(event.address)}
                sx={{color: 'primary.main'}}
              >
                {event.address}
              </Link>
            </Typography>
          </Box>
        )}
        {!!event.description && (
          <Box sx={{marginTop: 2}}>
            <Typography variant="overline" color="GrayText">
              {t('event.fields.description')}
            </Typography>
            <Typography variant="body1">{event.description}</Typography>
          </Box>
        )}
      </Card>
    </Popup>
  );
};
export default EventPopup;
