import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EventCard from './EventCard';

interface Props {
  label: string;
  events: object[];
}

const Section = (props: Props) => {
  const {label, events} = props;
  return (
    <Box mb={8}>
      <Typography gutterBottom variant="h6" component="h3">
        {label}
      </Typography>
      <Grid container spacing={4}>
        {events.map(event => (
          <Grid item xs={12} md={3} lg={4} key={event.id}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Section;
