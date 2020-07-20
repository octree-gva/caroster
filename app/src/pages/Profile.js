import React from 'react';
import {useAuth} from 'strapi-react-context';
import Layout from '../layouts/Centered';
import {useTranslation} from 'react-i18next';
import GenericMenu from '../containers/GenericMenu';

import {useHistory} from 'react-router-dom';

const Menu = () => {
  const history = useHistory();
  const {t} = useTranslation();
  const {logout} = useAuth();
  const goDashboard = history.push.bind(undefined, '/dashboard');
  const goNewEvent = history.push.bind(undefined, '/new');
  const goAbout = () => (window.location.href = t('meta.about_href'));

  return (
    <GenericMenu
      title={t('profile.title')}
      actions={[
        {
          label: t('menu.new_event'),
          onClick: goNewEvent,
          id: 'AddEventTabs',
        },
        {
          label: t('menu.dashboard'),
          onClick: goDashboard,
          id: 'DashboardTabs',
        },
        {
          label: t('menu.logout'),
          onClick: logout,
          id: 'LogoutTabs',
        },
        {
          label: t('menu.about'),
          onClick: goAbout,
          id: 'AboutTabs',
        },
      ]}
    />
  );
};

const Profile = () => {
  const {t} = useTranslation();
  return (
    <>
      <Menu />
      <Layout title={t('meta.profile_title')}>Profile – NOT IMPLEMENTED</Layout>
    </>
  );
};

export default Profile;
