import router from 'next/router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/styles';
import {useTranslation} from 'react-i18next';
import {EventEntity} from '../../generated/graphql';

interface Props {
  event: EventEntity;
}

const EventCard = ({event}: Props) => {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <Card
      className={classes.clickable}
      onClick={() =>
        router.push(`/e/${event.attributes.uuid}`, undefined, {shallow: true})
      }
    >
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
        <Button color="primary">{t('dashboard.actions.see_event')}</Button>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles({
  clickable: {
    cursor: 'pointer',
  },
});
export default EventCard;
