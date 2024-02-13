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
import {
  Event as EventType,
  useEventByUuidQuery,
  Module,
} from '../generated/graphql';

const POLL_INTERVAL = 10000;

export type TabComponent<TabProps> = (
  props: {
    event: EventType & {id: string};
    modulesSettings: Module;
  } & TabProps
) => JSX.Element;

interface Props {
  modulesSettings?: Module;
  eventUUID: string;
  Tab: TabComponent<{}>;
  goBack?: () => void;
  titleKey?: string;
  tabProps?: any;
}

const EventLayout = (props: PropsWithChildren<Props>) => {
  const {
    eventUUID,
    modulesSettings,
    Tab,
    goBack,
    titleKey,
    tabProps = {},
    ...pageProps
  } = props;
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
        height="calc(100% - 80px)"
        overflow="hidden"
        flexDirection={isMobile ? 'column-reverse' : 'row'}
      >
        <DrawerMenu eventUuid={event.uuid} />
        <Box
          sx={{
            position: 'relative',
            flex: 1,
            maxWidth: 'calc(100% - 109px)',
            overflow: 'auto',

            [theme.breakpoints.down('md')]: {
              maxWidth: '100%',
            },
          }}
          id="event-content"
        >
          <EventBar
            title={t(titleKey)}
            goBack={goBack}
            event={event}
            onAdd={setIsAddToMyEvent}
          />
          <Tab event={event} modulesSettings={modulesSettings} {...tabProps} />
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
