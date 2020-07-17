import React, {useEffect, useState, useCallback} from 'react';
import {useStrapi, useAuth} from 'strapi-react-context';
import Layout from '../layouts/Centered';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
const Dashboard = () => {
  const classes = useStyles();
  const {t} = useTranslation();
  const [myEvents, setMyEvents] = useState([]);
  const strapi = useStrapi();
  const {authState, token} = useAuth();
  const fetchEvents = useCallback(
    async query => {
      const myEvents = await strapi.services.events.find(query);
      setMyEvents(myEvents);
    },
    [strapi.services.events]
  );
  useEffect(() => {
    if (!token) return;
    const {
      user: {events = []},
    } = authState;
    fetchEvents(
      events
        .reduce((acc, eventId) => {
          return acc + `id_in=${eventId}&`;
        }, '')
        .substring(-1)
    );
  }, [authState, token, fetchEvents]);

  if (!token || !myEvents) return <div>Not connected</div>;

  return (
    <Layout>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={6}>
          <Grid container justify="center" spacing={4}>
            {myEvents.map(event => (
              <Grid key={event.id} item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {event.name}
                    </Typography>
                    <Typography variant="body1">
                      {t('event.fields.starts_on')}
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                      {event.date || t('event.fields.empty')}
                    </Typography>

                    <Typography variant="body1">
                      {t('event.fields.address')}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {event.address || t('event.fields.empty')}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href={`/e/${event.id}`}>See event</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    minWidth: '300px',
  },
}));
export default Dashboard;
