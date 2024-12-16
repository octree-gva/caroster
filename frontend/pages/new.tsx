import {useRouter} from 'next/router';
import {useTranslation} from 'next-i18next';
import Layout from '../layouts/Centered';
import CreateEvent from '../containers/CreateEvent';
import LanguagesIcon from '../containers/Languages/Icon';
import Logo from '../components/Logo';
import {useSession} from 'next-auth/react';
import pageUtils from '../lib/pageUtils';
import theme from '../theme';
import Paper from '@mui/material/Paper';

interface PageProps {
  announcement?: string;
}

const Home = (props: PageProps) => {
  const {t} = useTranslation();
  const router = useRouter();
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';
  const isReady = session.status !== 'loading';

  const noUserMenuActions = [
    {
      label: t('menu.login'),
      onClick: () => router.push('/auth/login'),
      id: 'LoginTabs',
    },
  ];

  const loggedMenuActions = [
    {
      label: t('menu.profile'),
      onClick: () => router.push('/profile'),
      id: 'ProfileTabs',
    },
    {divider: true},
    {
      label: t('menu.dashboard'),
      onClick: () => router.push('/dashboard'),
      id: 'SeeDashboardTabs',
    },
  ];

  const menuActions = isAuthenticated ? loggedMenuActions : noUserMenuActions;

  if (!isReady) return null;

  return (
    <Layout
      menuTitle={t('event.creation.title')}
      menuActions={menuActions}
      displayMenu={isAuthenticated}
      {...props}
    >
      <Paper
        sx={{
          padding: theme.spacing(2),
          width: '480px',
          maxWidth: '100%',
          display: 'block',
          margin: '0 auto',
        }}
      >
        <Logo />
        <CreateEvent />
      </Paper>
      {!isAuthenticated && <LanguagesIcon displayMenu={false} />}
    </Layout>
  );
};

export const getServerSideProps = pageUtils.getServerSideProps();

export default Home;
