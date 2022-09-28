import {useMemo} from 'react';
import {useRouter} from 'next/router';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import useProfile from '../hooks/useProfile';
import LayoutDefault from '../layouts/Default';
import DashboardEvents from '../containers/DashboardEvents';
import DashboardEmpty from '../containers/DashboardEmpty';
import Loading from '../containers/Loading';
import Fab from '../containers/Fab';
import pageUtils from '../lib/pageUtils';
import {getSession} from 'next-auth/react';

interface PageProps {
  announcement?: string;
}

const Dashboard = (props: PageProps) => {
  const {t} = useTranslation();
  const router = useRouter();
  const {profile, isReady} = useProfile();
  const events = profile?.events?.data || [];

  const pastEvents = useMemo(
    () =>
      events
        ?.filter(({date}) => date && moment(date).isBefore(moment(), 'day'))
        .sort(sortDesc),
    [events]
  );

  const futureEvents = useMemo(
    () =>
      events
        ?.filter(
          ({date}) => date && moment(date).isSameOrAfter(moment(), 'day')
        )
        .sort(sortDesc),
    [events]
  );

  const noDateEvents = useMemo(
    () => events?.filter(({date}) => !date),
    [events]
  );

  const menuActions = [
    {
      label: t('menu.profile'),
      onClick: () => router.push('/profile'),
      id: 'ProfileTabs',
    },
    {divider: true},
    {
      label: t('menu.new_event'),
      onClick: () => router.push('/'),
      id: 'AddEventTabs',
    },
  ];

  if (!events || !isReady)
    return (
      <LayoutDefault menuTitle={t('dashboard.title')} {...props}>
        <Loading />
      </LayoutDefault>
    );

  return (
    <LayoutDefault
      menuActions={menuActions}
      menuTitle={t('dashboard.title')}
      {...props}
    >
      {events.length === 0 ? (
        <DashboardEmpty />
      ) : (
        <DashboardEvents
          pastEvents={pastEvents}
          futureEvents={futureEvents}
          noDateEvents={noDateEvents}
        />
      )}
      <Fab onClick={() => router.push('/')} aria-label="add-event">
        {t('dashboard.actions.add_event')}
      </Fab>
    </LayoutDefault>
  );
};

const sortDesc = ({date: dateA}, {date: dateB}) => dateB.localeCompare(dateA);

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

export default Dashboard;
