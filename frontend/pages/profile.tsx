import Layout from '../layouts/Centered';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import Loading from '../containers/Loading';
import Profile from '../containers/Profile';
import useProfile from '../hooks/useProfile';
import useAuthStore from '../stores/useAuthStore';
import {useUpdateMeMutation, EditUserInput} from '../generated/graphql';

const ProfilePage = () => {
  const router = useRouter();
  const {t} = useTranslation();
  const logout = useAuthStore(s => s.logout);
  const {profile} = useProfile();
  const [updateProfile] = useUpdateMeMutation();

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
        logout={() => logout()}
      />
    </Layout>
  );
};

export default ProfilePage;
