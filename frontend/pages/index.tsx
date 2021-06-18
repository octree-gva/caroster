import {useRouter} from 'next/router';
import Layout from '../layouts/Centered';
import Paper from '../components/Paper';
import Logo from '../components/Logo';
import CreateEvent from '../containers/CreateEvent';
import {useTranslation} from 'react-i18next';
import useAuthStore from '../stores/useAuthStore';

const Home = () => {
  const router = useRouter();
  const {t} = useTranslation();
  const {token} = useAuthStore();

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

  const menuActions = token ? loggedMenuActions : noUserMenuActions;

  return (
    <Layout
      menuTitle={t('event.creation.title')}
      menuActions={menuActions}
      displayMenu={!!token}
    >
      <Paper className={null}>
        <Logo />
        <CreateEvent />
      </Paper>
    </Layout>
  );
};

export default Home;
