import router from 'next/router';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import {EventEntity} from '../../generated/graphql';

const PREFIX = 'EventCard';

const classes = {
  clickable: `${PREFIX}-clickable`,
  name: `${PREFIX}-name`
};

const StyledCard = styled(Card)({
  [`&.${classes.clickable}`]: {
    cursor: 'pointer',
  },
  [`& .${classes.name}`]: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
});

interface Props {
  event: EventEntity;
}

const EventCard = ({event}: Props) => {
  const {t} = useTranslation();


  return (
    <StyledCard
      className={classes.clickable}
      onClick={() =>
        router.push(`/e/${event.attributes.uuid}`, undefined, {shallow: true})
      }
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="h3"
          className={classes.name}
        >
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
    </StyledCard>
  );
};

export default EventCard;
