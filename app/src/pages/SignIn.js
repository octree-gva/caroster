import React from 'react';
import Layout from '../layouts/Centered';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Logo from '../components/Logo';
import Si from '../containers/SignIn';

const SignIn = () => {
  return (
    <Layout>
      <Card>
        <CardMedia component={Logo} />
        <Si />
      </Card>
    </Layout>
  );
};

export default SignIn;
