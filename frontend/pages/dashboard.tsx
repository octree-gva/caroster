import {useMemo} from 'react';
import moment from 'moment';
import Cookies from 'cookies';
import {useRouter} from 'next/router';
import {getSession} from 'next-auth/react';
import {useTranslation} from 'next-i18next';
import LayoutDefault from '../layouts/Default';
import DashboardEvents from '../containers/DashboardEvents';
import DashboardEmpty from '../containers/DashboardEmpty';
import Loading from '../containers/Loading';
import Fab from '../containers/Fab';
import pageUtils from '../lib/pageUtils';
import useProfile from '../hooks/useProfile';

interface PageProps {
  announcement?: string;
}

const Dashboard = (props: PageProps) => {
  const {t} = useTranslation();
  const router = useRouter();
  const {profile, isReady} = useProfile();
  const events = useMemo(() => profile?.events?.data || [], [profile]);

  const pastEvents = useMemo(
    () =>
      events
        ?.filter(
          ({attributes: {date}}) =>
            date && moment(date).isBefore(moment(), 'day')
        )
        .sort(sortDesc),
    [events]
  );

  const futureEvents = useMemo(
    () =>
      events
        ?.filter(
          ({attributes: {date}}) =>
            date && moment(date).isSameOrAfter(moment(), 'day')
        )
        .sort(sortDesc),
    [events]
  );

  const noDateEvents = useMemo(
    () => events?.filter(({attributes: {date}}) => !date),
    [events]
  );

  const menuActions = [
    {
      label: t('menu.profile'),
      onClick: () => router.push('/profile'),
      id: 'ProfileTabs',
      icon: 'account_circle',
    },
    {
      label: t('menu.new_event'),
      onClick: () => router.push('/new'),
      id: 'AddEventTabs',
      icon: 'add',
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
      <Fab
        onClick={() => router.push('/new')}
        aria-label={t('dashboard.actions.add_event')}
        noDrawer
      >
        {t('dashboard.actions.add_event')}
      </Fab>
    </LayoutDefault>
  );
};

const sortDesc = ({attributes: {date: dateA}}, {attributes: {date: dateB}}) =>
  dateB.localeCompare(dateA);

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const hasAcceptedTos = !!session?.profile?.tosAcceptationDate;

  if (!hasAcceptedTos)
    return {
      redirect: {
        destination: '/auth/confirm',
        permanent: false,
      },
    };

  const cookies = new Cookies(context.req, context.res);
  const redirectPath = cookies.get('redirectPath');
  if (redirectPath) {
    cookies.set('redirectPath'); // Delete cookie
    return {
      redirect: {
        destination: redirectPath,
        permanent: false,
      },
    };
  }

  return pageUtils.getServerSideProps()(context);
};

export default Dashboard;
