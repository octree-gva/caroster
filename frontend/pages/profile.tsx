import {useRouter} from 'next/router';
import {useTranslation} from 'react-i18next';
import Loading from '../containers/Loading';
import Profile from '../containers/Profile';
import Layout from '../layouts/Centered';
import {useSession, signOut} from 'next-auth/react';
import pageUtils from '../lib/pageUtils';
import useProfile from '../hooks/useProfile';
import {useEffect} from 'react';

const ProfilePage = () => {
  const router = useRouter();
  const {t} = useTranslation();
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';
  const {profile} = useProfile();

  useEffect(() => {
    if (!isAuthenticated) router.push('/');
  }, [isAuthenticated]);

  const menuActions = [
    {
      label: t('menu.new_event'),
      onClick: () => router.push('/'),
      id: 'AddEventTabs',
    },
    {
      label: t('menu.dashboard'),
      onClick: () => router.push('/dashboard'),
      id: 'DashboardTabs',
    },
  ];

  if (session.status === 'loading') return <Loading />;
  else if (!isAuthenticated) return null;

  return (
    <Layout menuTitle={t('profile.title')} menuActions={menuActions} goBack>
      {profile && <Profile profile={profile} logout={signOut} />}
    </Layout>
  );
};

export const getServerSideProps = pageUtils.getServerSideProps();

export default ProfilePage;
