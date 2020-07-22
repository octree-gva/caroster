import React from 'react';
import Layout from '../layouts/Centered';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Logo from '../components/Logo';
import SignUpForm from '../containers/SignUpForm';
import {useTranslation} from 'react-i18next';

const SignUp = () => {
  const {t} = useTranslation();
  return (
    <Layout menuTitle={t('signup.title')}>
      <Card>
        <CardMedia component={Logo} />
        <SignUpForm />
      </Card>
    </Layout>
  );
};

export default SignUp;
