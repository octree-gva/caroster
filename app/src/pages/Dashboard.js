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

import {useHistory} from 'react-router-dom';
const Dashboard = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {t} = useTranslation();
  const strapi = useStrapi();
  const {authState, token} = useAuth();
  const history = useHistory();
  const sortDesc = ({date: dateA}, {date: dateB}) => dateB.localeCompare(dateA);
  const pastEvents = useMemo(
    () =>
      myEvents
        .filter(({date}) => {
          return date && moment(date).isBefore(moment());
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
          return date && moment(date).isAfter(moment());
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
    setIsLoading(true);
    const {
      user: {events = []},
    } = authState;
    fetchEvents(
      events
        .reduce((acc, eventId) => {
          return acc + `id_in=${eventId}&`;
        }, '')
        .substring(-1)
    ).then(() => setIsLoading(false));
  }, [authState, token, fetchEvents]);

  if (isLoading) return <Loading />;

  if (!token || !myEvents) return <div>Not connected</div>;

  if (!isLoading && myEvents.length === 0) {
    return (
      <LayoutCentered>
        <EmptyDashboard />
      </LayoutCentered>
    );
  }
  const goProfile = history.push.bind(undefined, '/profile');
  const goNewEvent = history.push.bind(undefined, '/new');
  const goAbout = () => (window.location.href = t('meta.about_href'));

  return (
    <>
      <GenericMenu
        title={t('dashboard.title')}
        actions={[
          {
            label: t('dashboard.actions.add_event'),
            onClick: goNewEvent,
            id: 'AddEventTabs',
          },
          {
            label: t('dashboard.actions.see_profile'),
            onClick: goProfile,
            id: 'ProfileTabs',
          },
          {
            label: t('dashboard.actions.about'),
            onClick: goAbout,
            id: 'AboutTabs',
          },
        ]}
      />
      <LayoutDefault>
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

export default Dashboard;
