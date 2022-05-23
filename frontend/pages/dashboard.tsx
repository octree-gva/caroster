import {useMemo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import useAuthStore from '../stores/useAuthStore';
import useProfile from '../hooks/useProfile';
import LayoutDefault from '../layouts/Default';
import DashboardEvents from '../containers/DashboardEvents';
import DashboardEmpty from '../containers/DashboardEmpty';
import Loading from '../containers/Loading';
import Fab from '../containers/Fab';
import useBannerStore from '../stores/useBannerStore';

const Dashboard = () => {
  const {t} = useTranslation();
  const router = useRouter();
  const isAuth = useAuthStore(s => !!s.token);
  const {profile, isReady} = useProfile();
  const {events} = profile || {};
  const bannerOffset = useBannerStore(s => s.offset);
  const classes = useStyles({bannerOffset});

  useEffect(() => {
    if (!isAuth) router.push('/');
  }, [isAuth]);

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

  if (!events || !isAuth || !isReady)
    return (
      <LayoutDefault menuTitle={t('dashboard.title')}>
        <Loading />
      </LayoutDefault>
    );

  return (
    <LayoutDefault
      className={classes.root}
      menuActions={menuActions}
      menuTitle={t('dashboard.title')}
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

const useStyles = makeStyles(theme => ({
  root: ({bannerOffset}) => ({
    minHeight: '100vh',
    paddingTop: theme.mixins.toolbar.minHeight + bannerOffset,
  }),
}));

export default Dashboard;
