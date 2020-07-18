import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {EventCard} from './EventCard';
import Typography from '@material-ui/core/Typography';
const DashboardSection = ({children}) => (
  <Grid item xs={12}>
    <Typography gutterBottom variant="h6" component="h3">
      {children}
    </Typography>
  </Grid>
);
const Dashboard = ({futureEvents, noDateEvents, pastEvents}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const cardsForEvents = events =>
    events.map(event => (
      <Grid item xs={3} key={event.id}>
        <EventCard event={event} />
      </Grid>
    ));

  return (
    <Grid container className={classes.root} spacing={4}>
      {futureEvents.length + noDateEvents.length > 0 && (
        <>
          <DashboardSection>
            {t('dashboard.sections.future', {
              count: futureEvents.length + noDateEvents.length,
            })}
          </DashboardSection>
          {cardsForEvents(futureEvents)}
          {cardsForEvents(noDateEvents)}
        </>
      )}

      {pastEvents.length > 0 && (
        <>
          <DashboardSection>
            {t('dashboard.sections.past', {count: pastEvents.length})}
          </DashboardSection>
          {cardsForEvents(pastEvents)}
        </>
      )}
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '90rem',
    margin: '0 auto',
  },
}));
export default Dashboard;
