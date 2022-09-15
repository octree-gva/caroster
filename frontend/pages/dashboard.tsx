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

const Dashboard = () => {
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
      label: t('menu.new_event'),
      onClick: () => router.push('/'),
      id: 'AddEventTabs',
    },
    {
      label: t('menu.profile'),
      onClick: () => router.push('/profile'),
      id: 'ProfileTabs',
    },
  ];

  if (!events || !isReady)
    return (
      <LayoutDefault menuTitle={t('dashboard.title')}>
        <Loading />
      </LayoutDefault>
    );

  return (
    <LayoutDefault menuActions={menuActions} menuTitle={t('dashboard.title')}>
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

export const getServerSideProps = pageUtils.getServerSideProps();

export default Dashboard;
