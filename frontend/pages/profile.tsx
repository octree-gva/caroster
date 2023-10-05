import Box from '@mui/material/Box';
import {useRouter} from 'next/router';
import {useTranslation} from 'react-i18next';
import Loading from '../containers/Loading';
import Profile from '../containers/Profile';
import LayoutDefault from '../layouts/Default';
import {useSession, signOut, getSession} from 'next-auth/react';
import pageUtils from '../lib/pageUtils';
import useProfile from '../hooks/useProfile';

interface PageProps {
  announcement?: string;
}

const ProfilePage = (props: PageProps) => {
  const router = useRouter();
  const {t} = useTranslation();
  const session = useSession();
  const {profile} = useProfile();

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

  return (
    <LayoutDefault
      menuTitle={t('profile.title')}
      menuActions={menuActions}
      goBack
      {...props}
    >
      {profile && <Profile profile={profile} logout={signOut} />} 
    </LayoutDefault>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  else return pageUtils.getServerSideProps()(context);
};

export default ProfilePage;
