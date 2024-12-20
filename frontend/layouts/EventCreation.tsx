import {Paper} from '@mui/material';
import Layout from './Centered';
import Logo from '../components/Logo';
import LanguagesIcon from '../containers/Languages/Icon';
import {useTranslation} from 'next-i18next';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {ReactNode} from 'react';

interface Props {
  announcement?: string;
  children: ReactNode;
}

const EventCreationLayout = (props: Props) => {
  const {t} = useTranslation();
  const router = useRouter();
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';

  const menuActions = isAuthenticated
    ? [
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
      ]
    : [
        {
          label: t('menu.login'),
          onClick: () => router.push('/auth/login'),
          id: 'LoginTabs',
        },
      ];

  return (
    <Layout
      menuTitle={t('event.creation.title')}
      displayMenu={isAuthenticated}
      menuActions={menuActions}
      {...props}
    >
      {props.children}
      {!isAuthenticated && <LanguagesIcon displayMenu={false} />}
    </Layout>
  );
};

export default EventCreationLayout;
