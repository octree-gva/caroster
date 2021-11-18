import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useTranslation} from 'react-i18next';
import {useUpdateMeMutation, EditUserInput} from '../generated/graphql';
import useAuthStore from '../stores/useAuthStore';
import useProfile from '../hooks/useProfile';
import Loading from '../containers/Loading';
import Profile from '../containers/Profile';
import Layout from '../layouts/Centered';

const ProfilePage = () => {
  const router = useRouter();
  const {t} = useTranslation();
  const isAuth = useAuthStore(s => !!s.token);
  const logout = useAuthStore(s => s.logout);
  const {profile} = useProfile();
  const [updateProfile] = useUpdateMeMutation();

  useEffect(() => {
    if (!isAuth) router.push('/');
  }, [isAuth]);

  const onUpdateProfile = (userUpdate: EditUserInput) =>
    updateProfile({variables: {userUpdate}});

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

  if (!profile) return <Loading />;

  return (
    <Layout menuTitle={t('profile.title')} menuActions={menuActions} goBack>
      <Profile
        profile={profile}
        updateProfile={onUpdateProfile}
        logout={logout}
      />
    </Layout>
  );
};

export default ProfilePage;
