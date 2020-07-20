import React from 'react';
import Container from '@material-ui/core/Container';
import DefaultLayout from './Default';
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  layout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
}));

const CenteredLayout = ({children, title}) => {
  const classes = useStyles();

  return (
    <DefaultLayout title={title}>
      <div className={classes.layout}>
        <Container maxWidth="sm">{children}</Container>
      </div>
    </DefaultLayout>
  );
};

export default CenteredLayout;
