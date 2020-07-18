import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
export const EmptyDashboard = () => {
  const {t} = useTranslation();
  const history = useHistory();
  const goNewEvent = history.push.bind(undefined, '/new');
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h1">
          {t('dashboard.noEvent.title')}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          dangerouslySetInnerHTML={{
            __html: t('dashboard.noEvent.text_html'),
          }}
        />
      </CardContent>
      <CardActions>
        <Button
          onClick={() => goNewEvent()}
          variant="contained"
          color="primary"
        >
          {t('dashboard.noEvent.create_event')}
        </Button>
      </CardActions>
    </Card>
  );
};
