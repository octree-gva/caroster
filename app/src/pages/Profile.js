import React from 'react';
import {useAuth} from 'strapi-react-context';
import Layout from '../layouts/Centered';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';

const Profile = () => {
  const history = useHistory();
  const {t} = useTranslation();
  const {logout} = useAuth();

  const menuActions = [
    {
      label: t('menu.new_event'),
      onClick: () => history.push('/new'),
      id: 'AddEventTabs',
    },
    {
      label: t('menu.dashboard'),
      onClick: () => history.push('/dashboard'),
      id: 'DashboardTabs',
    },
    {
      label: t('menu.logout'),
      onClick: logout,
      id: 'LogoutTabs',
    },
  ];

  return (
    <Layout menuTitle={t('profile.title')} menuActions={menuActions}>
      Profile – NOT IMPLEMENTED
    </Layout>
  );
};

export default Profile;
