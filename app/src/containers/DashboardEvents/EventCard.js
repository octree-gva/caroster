import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

const EventCard = ({event}) => {
  const {t} = useTranslation();
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h3">
          {event.name}
        </Typography>
        <Typography variant="body1">{t('event.fields.starts_on')}</Typography>
        <Typography variant="body2" gutterBottom>
          {event.date || t('event.fields.empty')}
        </Typography>
        <Typography variant="body1">{t('event.fields.address')}</Typography>
        <Typography variant="body2" gutterBottom>
          {event.address || t('event.fields.empty')}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/e/${event.id}`}>
          <Button>{t('dashboard.actions.see_event')}</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default EventCard;