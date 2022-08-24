import Link from 'next/link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import {EventEntity} from '../../generated/graphql';

interface Props {
  event: EventEntity;
}

const EventCard = ({event}: Props) => {
  const {t} = useTranslation();

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h3">
          {event.attributes.name}
        </Typography>
        <Typography variant="overline">{t('event.fields.date')}</Typography>
        <Typography variant="body2" gutterBottom>
          {event.attributes.date || t('event.fields.empty')}
        </Typography>
        <Typography variant="overline">{t('event.fields.address')}</Typography>
        <Typography variant="body2" gutterBottom>
          {event.attributes.address || t('event.fields.empty')}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/e/${event.attributes.uuid}`} passHref>
          <Button color="primary">{t('dashboard.actions.see_event')}</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default EventCard;
