import {PropsWithChildren, useEffect, useState} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import ErrorPage from '../pages/_error';
import useEventStore from '../stores/useEventStore';
import Layout from '../layouts/Default';
import EventBar from '../containers/EventBar';
import {
  Event as EventType,
  useEventByUuidQuery,
  useUpdateEventMutation,
  EditEventInput,
} from '../generated/graphql';
import DrawerMenu from '../containers/DrawerMenu';
import AddToMyEventDialog from '../containers/AddToMyEventDialog';
import useToastStore from '../stores/useToastStore';
import Box from '@material-ui/core/Box';

const POLL_INTERVAL = 10000;

export type TabComponent = (props: {event: EventType}) => JSX.Element;

interface Props {
  eventUUID: string;
  Tab: TabComponent;
}

const EventLayout = (props: PropsWithChildren<Props>) => {
  const {eventUUID, Tab} = props;
  const {t} = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const setEvent = useEventStore(s => s.setEvent);
  const [isAddToMyEvent, setIsAddToMyEvent] = useState(false);
  const {data: {eventByUUID: event} = {}} = useEventByUuidQuery({
    pollInterval: POLL_INTERVAL,
    variables: {uuid: eventUUID},
  });

  useEffect(() => {
    if (event) setEvent(event as EventType);
  }, [event]);

  if (!event) return <ErrorPage statusCode={404} title={t`event.not_found`} />;

  return (
    <Layout
      pageTitle={t('event.title', {title: event.name})}
      menuTitle={t('event.title', {title: event.name})}
      displayMenu={false}
      Topbar={() => <EventBar event={event} onAdd={setIsAddToMyEvent} />}
    >
      <Box
        flex={1}
        display="flex"
        alignItems="stretch"
        height="calc(100% - 56px)"
        overflow="hidden"
        flexDirection={isMobile ? 'column-reverse' : 'row'}
      >
        <DrawerMenu />
        <Box className={classes.content}>
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

const useStyles = makeStyles(theme => ({
  content: {
    flex: 1,
    maxWidth: 'calc(100% - 85px)',
    overflow: 'auto',
    paddingBottom: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
}));

export default EventLayout;
