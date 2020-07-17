import React from 'react';
import Layout from '../layouts/Centered';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Logo from '../components/Logo';
import SignIn from '../containers/SignIn';

export default () => {
  return (
    <Layout>
      <Card>
        <CardMedia component={Logo} />
        <SignIn />
      </Card>
    </Layout>
  );
};
