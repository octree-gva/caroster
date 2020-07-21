import React from 'react';
import Layout from '../layouts/Centered';
import Paper from '../components/Paper';
import Logo from '../components/Logo';
import CreateEvent from '../containers/CreateEvent';
import {useAuth} from 'strapi-react-context';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const Home = () => {
  const history = useHistory();
  const {t} = useTranslation();
  const {token} = useAuth();

  const noUserMenuActions = [
    {
      label: t('menu.login'),
      onClick: () => history.push('/login'),
      id: 'LoginTabs',
    },
    {
      label: t('menu.register'),
      onClick: () => history.push('/register'),
      id: 'RegisterTabs',
    },
  ];

  const loggedMenuActions = [
    {
      label: t('menu.dashboard'),
      onClick: () => history.push('/dashboard'),
      id: 'SeeDashboardTabs',
    },
    {
      label: t('menu.profile'),
      onClick: () => history.push('/profile'),
      id: 'ProfileTabs',
    },
  ];

  const menuActions = token ? loggedMenuActions : noUserMenuActions;

  return (
    <Layout menuTitle={t('event.creation.title')} menuActions={menuActions}>
      <Paper>
        <Logo />
        <CreateEvent />
      </Paper>
    </Layout>
  );
};

export default Home;
