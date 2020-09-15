import React from 'react';
import {useAuth} from 'strapi-react-context';
import Layout from '../layouts/Centered';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
import Loading from './Loading';
import Profile from '../containers/Profile';
import useProfile from '../hooks/useProfile';

const ProfilePage = () => {
  const history = useHistory();
  const {t} = useTranslation();
  const {logout, updateProfile} = useAuth();
  const {profile} = useProfile();

  const menuActions = [
    {
      label: t('menu.new_event'),
      onClick: () => history.push('/new'),
      id: 'AddEventTabs',
    },
    {
      label: t('menu.dashboard'),
      onClick: () => history.push('/dashboard'),
      id: 'DashboardTabs',
    },
  ];

  if (!profile) return <Loading />;

  return (
    <Layout menuTitle={t('profile.title')} menuActions={menuActions} goBack>
      <Profile
        profile={profile}
        updateProfile={updateProfile}
        logout={logout}
      />
    </Layout>
  );
};

export default ProfilePage;
