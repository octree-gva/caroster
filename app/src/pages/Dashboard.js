import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {useStrapi, useAuth} from 'strapi-react-context';
import LayoutCentered from '../layouts/Centered';
import LayoutDefault from '../layouts/Default';
import moment from 'moment';
import Loading from './Loading';
import DashboardWithCard, {
  EmptyDashboard,
  DashboardFab,
} from '../containers/Dashboard';
import {useTranslation} from 'react-i18next';
import GenericMenu from '../containers/GenericMenu';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';

const Menu = () => {
  const history = useHistory();
  const {t} = useTranslation();
  const goProfile = history.push.bind(undefined, '/profile');
  const goNewEvent = history.push.bind(undefined, '/new');
  const goAbout = () => (window.location.href = t('meta.about_href'));

  return (
    <GenericMenu
      title={t('dashboard.title')}
      actions={[
        {
          label: t('menu.new_event'),
          onClick: goNewEvent,
          id: 'AddEventTabs',
        },
        {
          label: t('menu.profile'),
          onClick: goProfile,
          id: 'ProfileTabs',
        },
        {
          label: t('menu.about'),
          onClick: goAbout,
          id: 'AboutTabs',
        },
      ]}
    />
  );
};
const sortDesc = ({date: dateA}, {date: dateB}) => dateB.localeCompare(dateA);

const Dashboard = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const strapi = useStrapi();
  const {authState, token} = useAuth();
  const {t} = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const goNewEvent = history.push.bind(undefined, '/new');
  const pastEvents = useMemo(
    () =>
      myEvents
        .filter(({date}) => {
          return date && moment(date).isBefore(moment(), 'day');
        })
        .sort(sortDesc),
    [myEvents]
  );
  const noDateEvents = useMemo(
    () =>
      myEvents.filter(({date}) => {
        return !date;
      }),
    [myEvents]
  );
  const futureEvents = useMemo(
    () =>
      myEvents
        .filter(({date}) => {
          return date && moment(date).isSameOrAfter(moment(), 'day');
        })
        .sort(sortDesc),
    [myEvents]
  );
  const fetchEvents = useCallback(
    async query => {
      const myEvents = await strapi.services.events.find(query);
      setMyEvents(myEvents);
    },
    [strapi.services.events]
  );

  useEffect(() => {
    if (!token) return;
    const {
      user: {events = []},
    } = authState;
    if (events.length > 0) {
      setIsLoading(true);
      fetchEvents(
        events
          .reduce((acc, eventId) => {
            return acc + `id_in=${eventId}&`;
          }, '')
          .substring(-1)
      ).then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [authState, token, fetchEvents]);

  if (isLoading) return <Loading />;

  if (!token || !myEvents) return <div>Not connected</div>;

  if (!isLoading && myEvents.length === 0) {
    return (
      <>
        <Menu />
        <LayoutCentered title={t('meta.dashboard_title')}>
          <EmptyDashboard />
          <DashboardFab onClick={() => goNewEvent()} />
        </LayoutCentered>
      </>
    );
  }

  return (
    <>
      <Menu />
      <LayoutDefault className={classes.root} title={t('meta.dashboard_title')}>
        <DashboardWithCard
          pastEvents={pastEvents}
          futureEvents={futureEvents}
          noDateEvents={noDateEvents}
        />
        <DashboardFab onClick={() => goNewEvent()} />
      </LayoutDefault>
    </>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '50px',
  },
}));
export default Dashboard;
