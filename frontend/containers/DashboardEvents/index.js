import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import EventCard from './EventCard';
import Section from './Section';

const DashboardEvents = ({futureEvents, noDateEvents, pastEvents}) => {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <Grid container className={classes.root} spacing={4}>
      {futureEvents.length > 0 && (
        <>
          <Section>
            {t('dashboard.sections.future', {
              count: futureEvents.length,
            })}
          </Section>
          {cardsForEvents(futureEvents)}
        </>
      )}
      {noDateEvents.length > 0 && (
        <>
          <Section>
            {t('dashboard.sections.noDate', {
              count: noDateEvents.length,
            })}
          </Section>
          {cardsForEvents(noDateEvents)}
        </>
      )}

      {pastEvents.length > 0 && (
        <>
          <Section>
            {t('dashboard.sections.past', {count: pastEvents.length})}
          </Section>
          {cardsForEvents(pastEvents)}
        </>
      )}
    </Grid>
  );
};

const cardsForEvents = events =>
  events.map(event => (
    <Grid item xs={12} md={3} lg={4} key={event.id}>
      <EventCard event={event} />
    </Grid>
  ));

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '90rem',
    width: '100%',
    margin: '0 auto',
  },
}));

export default DashboardEvents;
