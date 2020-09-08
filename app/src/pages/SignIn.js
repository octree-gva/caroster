import React from 'react';
import Card from '@material-ui/core/Card';
import {useTranslation} from 'react-i18next';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Layout from '../layouts/Centered';
import Logo from '../components/Logo';
import SignInForm from '../containers/SignInForm';
import LoginGoogle from '../containers/LoginGoogle';

const SignIn = () => {
  const {t} = useTranslation();
  return (
    <Layout menuTitle={t('signin.title')} displayMenu={false}>
      <Card>
        <CardMedia component={Logo} />
        <SignInForm />
        <Divider />
        <LoginGoogle />
      </Card>
    </Layout>
  );
};

export default SignIn;
