import React, {useMemo} from 'react';
import {useAuth} from 'strapi-react-context';
import LayoutDefault from '../layouts/Default';
import moment from 'moment';
import Loading from './Loading';
import DashboardEvents from '../containers/DashboardEvents';
import DashboardEmpty from '../containers/DashboardEmpty';
import Fab from '../containers/Fab';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import useProfile from '../hooks/useProfile';

const sortDesc = ({date: dateA}, {date: dateB}) => dateB.localeCompare(dateA);

const Dashboard = () => {
  const {authState} = useAuth();
  const {profile, isReady} = useProfile();
  const history = useHistory();
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

  const noDateEvents = useMemo(() => events.filter(({date}) => !date), [
    events,
  ]);

  if (!authState || !isReady)
    return (
      <LayoutDefault menuTitle={t('dashboard.title')}>
        <Loading />
      </LayoutDefault>
    );

  const menuActions = [
    {
      label: t('menu.new_event'),
      onClick: () => history.push('/new'),
      id: 'AddEventTabs',
    },
    {
      label: t('menu.profile'),
      onClick: () => history.push('/profile'),
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
      <Fab onClick={() => history.push('/new')} aria-label="add-event" />
    </LayoutDefault>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.mixins.toolbar.minHeight,
  },
}));
export default Dashboard;
