import React from 'react';
import Layout from '../layouts/Centered';
import Paper from '../components/Paper';
import Logo from '../components/Logo';
import CreateEvent from '../containers/CreateEvent';
import {useAuth} from 'strapi-react-context';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import GenericMenu from '../containers/GenericMenu';
const Menu = () => {
  const history = useHistory();
  const {t} = useTranslation();
  const {token} = useAuth();
  const goProfile = history.push.bind(undefined, '/profile');
  const goDashboard = history.push.bind(undefined, '/dashboard');
  const goLogin = history.push.bind(undefined, '/login');
  const goRegister = history.push.bind(undefined, '/register');
  const goAbout = () => (window.location.href = t('meta.about_href'));

  return (
    <GenericMenu
      title={t('event.creation.title')}
      actions={[
        !!token && {
          label: t('menu.dashboard'),
          onClick: goDashboard,
          id: 'SeeDashboardTabs',
        },
        !!token && {
          label: t('menu.profile'),
          onClick: goProfile,
          id: 'ProfileTabs',
        },
        !token && {
          label: t('menu.login'),
          onClick: goLogin,
          id: 'LoginTabs',
        },
        !token && {
          label: t('menu.register'),
          onClick: goRegister,
          id: 'RegisterTabs',
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

const Home = () => {
  return (
    <>
      <Menu />
      <Layout>
        <Paper>
          <Logo />
          <CreateEvent />
        </Paper>
      </Layout>
    </>
  );
};

export default Home;
