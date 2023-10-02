import {PropsWithChildren, useEffect, useState} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';
import ErrorPage from '../pages/_error';
import useEventStore from '../stores/useEventStore';
import Layout from '../layouts/Default';
import EventBar from '../containers/EventBar';
import DrawerMenu from '../containers/DrawerMenu';
import AddToMyEventDialog from '../containers/AddToMyEventDialog';
import {Event as EventType, useEventByUuidQuery} from '../generated/graphql';

const POLL_INTERVAL = 10000;

export type TabComponent = (props: {
  event: EventType & {id: string};
}) => JSX.Element;

interface Props {
  eventUUID: string;
  Tab: TabComponent;
}

const EventLayout = (props: PropsWithChildren<Props>) => {
  const {eventUUID, Tab, ...pageProps} = props;
  const {t} = useTranslation();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const setEvent = useEventStore(s => s.setEvent);
  const [isAddToMyEvent, setIsAddToMyEvent] = useState(false);
  const {data: {eventByUUID: {data: {attributes, id} = {}} = {}} = {}} =
    useEventByUuidQuery({
      pollInterval: POLL_INTERVAL,
      variables: {uuid: eventUUID},
    });
  const event = {id, ...attributes};

  useEffect(() => {
    if (event) setEvent(event);
  }, [event]);

  if (!event) return <ErrorPage statusCode={404} title={t`event.not_found`} />;

  return (
    <Layout
      pageTitle={t('event.title', {title: event.name})}
      menuTitle={t('event.title', {title: event.name})}
      displayMenu={false}
      {...pageProps}
    >
      <Box
        flex={1}
        display="flex"
        alignItems="stretch"
        height="calc(100% - 56px)"
        overflow="hidden"
        flexDirection={isMobile ? 'column-reverse' : 'row'}
      >
        <DrawerMenu eventUuid={event.uuid} />
        <Box
          sx={{
            position: 'relative',
            flex: 1,
            maxWidth: 'calc(100% - 85px)',
            overflow: 'auto',
            paddingBottom: theme.spacing(4),

            [theme.breakpoints.down('md')]: {
              maxWidth: '100%',
            },
          }}
          id="event-content"
        >
          <EventBar event={event} onAdd={setIsAddToMyEvent} />
          <Tab event={event} />
        </Box>
      </Box>
      <AddToMyEventDialog
        event={event}
        open={isAddToMyEvent}
        onClose={() => setIsAddToMyEvent(false)}
      />
    </Layout>
  );
};

export default EventLayout;
