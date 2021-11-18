import {useRouter} from 'next/router';
import {useTranslation} from 'react-i18next';
import useProfile from '../hooks/useProfile';
import Layout from '../layouts/Centered';
import CreateEvent from '../containers/CreateEvent';
import Paper from '../components/Paper';
import Logo from '../components/Logo';

const Home = () => {
  const {t} = useTranslation();
  const router = useRouter();
  const {notReady, profile} = useProfile();

  const noUserMenuActions = [
    {
      label: t('menu.login'),
      onClick: () => router.push('/auth/login'),
      id: 'LoginTabs',
    },
    {
      label: t('menu.register'),
      onClick: () => router.push('/auth/register'),
      id: 'RegisterTabs',
    },
  ];

  const loggedMenuActions = [
    {
      label: t('menu.dashboard'),
      onClick: () => router.push('/dashboard'),
      id: 'SeeDashboardTabs',
    },
    {
      label: t('menu.profile'),
      onClick: () => router.push('/profile'),
      id: 'ProfileTabs',
    },
  ];

  const menuActions = !!profile ? loggedMenuActions : noUserMenuActions;

  if (notReady) return null;

  return (
    <Layout
      menuTitle={t('event.creation.title')}
      menuActions={menuActions}
      displayMenu={!!profile}
    >
      <Paper className={null}>
        <Logo />
        <CreateEvent />
      </Paper>
    </Layout>
  );
};

export default Home;
