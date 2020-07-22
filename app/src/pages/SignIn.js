import React from 'react';
import Layout from '../layouts/Centered';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Logo from '../components/Logo';
import SignInForm from '../containers/SignInForm';
import {useTranslation} from 'react-i18next';

const SignIn = () => {
  const {t} = useTranslation();
  return (
    <Layout menuTitle={t('signin.title')}>
      <Card>
        <CardMedia component={Logo} />
        <SignInForm />
      </Card>
    </Layout>
  );
};

export default SignIn;
