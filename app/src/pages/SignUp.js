import React from 'react';
import Layout from '../layouts/Centered';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Logo from '../components/Logo';
import Su from '../containers/SignUp';
import {useTranslation} from 'react-i18next';
const SignUp = () => {
  const {t} = useTranslation();
  return (
    <Layout title={t('meta.register_title')}>
      <Card>
        <CardMedia component={Logo} />
        <Su />
      </Card>
    </Layout>
  );
};

export default SignUp;
