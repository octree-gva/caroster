import React from 'react';
import Container from '@material-ui/core/Container';
import DefaultLayout from './Default';
import {makeStyles} from '@material-ui/core/styles';

const CenteredLayout = ({children, ...props}) => {
  const classes = useStyles();

  return (
    <DefaultLayout {...props}>
      <div className={classes.layout}>
        <Container maxWidth="sm">{children}</Container>
      </div>
    </DefaultLayout>
  );
};

const useStyles = makeStyles(theme => ({
  layout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
}));

export default CenteredLayout;
