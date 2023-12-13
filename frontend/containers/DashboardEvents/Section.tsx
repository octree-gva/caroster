import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import EventCard from './EventCard';
import {EventEntity} from '../../generated/graphql';

interface Props {
  label: string;
  events: EventEntity[];
}

const Section = (props: Props) => {
  const {label, events} = props;
  const theme = useTheme();

  return (
    <Box
      mb={6}
      sx={{
        px: 1,
        [theme.breakpoints.down('md')]: {
          px: 0,
        },
      }}
    >
      <Typography
        gutterBottom
        variant="subtitle2"
        component="h3"
        color="GrayText"
        sx={{pb: 1}}
      >
        {label}
      </Typography>
      <Grid container spacing={3}>
        {events.map(event => (
          <Grid item xs={12} sm={4} lg={3} key={event.id}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Section;
