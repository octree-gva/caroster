import {useMemo} from 'react';
import LayoutDefault from '../layouts/Default';
import moment from 'moment';
import {useRouter} from 'next/router';
import Loading from '../containers/Loading';
import DashboardEvents from '../containers/DashboardEvents';
import DashboardEmpty from '../containers/DashboardEmpty';
import Fab from '../containers/Fab';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import useProfile from '../hooks/useProfile';
import useAuthStore from '../stores/useAuthStore';

const sortDesc = ({date: dateA}, {date: dateB}) => dateB.localeCompare(dateA);

const Dashboard = () => {
  const isAuth = useAuthStore(s => !!s.token);
  const {profile, isReady} = useProfile();
  const router = useRouter();
  const {t} = useTranslation();
  const classes = useStyles();
  const {events = []} = profile || {};

  const pastEvents = useMemo(
    () =>
      events
        .filter(({date}) => date && moment(date).isBefore(moment(), 'day'))
        .sort(sortDesc),
    [events]
  );

  const futureEvents = useMemo(
    () =>
      events
        .filter(({date}) => date && moment(date).isSameOrAfter(moment(), 'day'))
        .sort(sortDesc),
    [events]
  );

  const noDateEvents = useMemo(
    () => events.filter(({date}) => !date),
    [events]
  );

  if (!isAuth || !isReady)
    return (
      <LayoutDefault menuTitle={t('dashboard.title')}>
        <Loading />
      </LayoutDefault>
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

  return (
    <LayoutDefault
      className={classes.root}
      menuActions={menuActions}
      menuTitle={t('dashboard.title')}
    >
      {!events || events.length === 0 ? (
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
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.mixins.toolbar.minHeight,
  },
}));
export default Dashboard;
