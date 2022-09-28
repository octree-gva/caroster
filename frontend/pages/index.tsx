import {useRouter} from 'next/router';
import {useTranslation} from 'react-i18next';
import Layout from '../layouts/Centered';
import CreateEvent from '../containers/CreateEvent';
import LanguagesIcon from '../containers/Languages/Icon';
import Paper from '../components/Paper';
import Logo from '../components/Logo';
import {useSession} from 'next-auth/react';
import pageUtils from '../lib/pageUtils';
import {useEffect} from 'react';
import useRedirectUrlStore from '../stores/useRedirectUrl';

interface PageProps {
  announcement?: string;
}

const Home = (props: PageProps) => {
  const {t} = useTranslation();
  const router = useRouter();
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';
  const isReady = session.status !== 'loading';
  const getRedirectUrl = useRedirectUrlStore(s => s.getRedirectUrl);

  useEffect(() => {
    const redirectUrl = getRedirectUrl();
    if (redirectUrl) router.push(redirectUrl);
  }, []);

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
      <Paper>
        <Logo />
        <CreateEvent />
      </Paper>
      {!isAuthenticated && <LanguagesIcon displayMenu={false} />}
    </Layout>
  );
};

export const getServerSideProps = pageUtils.getServerSideProps();

export default Home;
