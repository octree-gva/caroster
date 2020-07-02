import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';

const Loading = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <CircularProgress />
    </Container>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
}));

export default Loading;
