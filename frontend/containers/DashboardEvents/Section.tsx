import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EventCard from './EventCard';
import { EventEntity } from '../../generated/graphql';

interface Props {
  label: string;
  events: EventEntity[];
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
