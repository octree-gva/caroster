import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Section = ({children}) => (
  <Grid item xs={12}>
    <Typography gutterBottom variant="h6" component="h3">
      {children}
    </Typography>
  </Grid>
);

export default Section;
