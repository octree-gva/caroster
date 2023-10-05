import router from 'next/router';
import moment from 'moment';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import {EventEntity} from '../../generated/graphql';

interface Props {
  event: EventEntity;
}

const EventCard = ({event}: Props) => {
  const {t} = useTranslation();

  return (
    <Card
      sx={{
        cursor: 'pointer',
      }}
      onClick={() =>
        router.push(`/e/${event.attributes.uuid}`, undefined, {shallow: true})
      }
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="h3"
          sx={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {event.attributes.name}
        </Typography>
        <Typography variant="overline">{t('event.fields.date')}</Typography>
        <Typography variant="body1" gutterBottom>
          {moment(event.attributes.date).format('DD/MM/YYYY') ||
            t('event.fields.empty')}
        </Typography>
        <Typography variant="overline">{t('event.fields.address')}</Typography>
        <Typography variant="body1" gutterBottom>
          {event.attributes.address || t('event.fields.empty')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{p: 0}} color="primary">
          {t('dashboard.actions.see_event')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
