import React from 'react';
import LostPasswordContainer from '../containers/LostPassword';
import Layout from '../layouts/Centered';
import {useTranslation} from 'react-i18next';
import {useAuth} from 'strapi-react-context';
import {Redirect} from 'react-router-dom';
const LostPassword = () => {
  const {t} = useTranslation();
  const {token} = useAuth();

  if (token) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Layout menuTitle={t('lost_password.title')}>
      <LostPasswordContainer />
    </Layout>
  );
};

export default LostPassword;
