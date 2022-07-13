import {PropsWithChildren, useEffect, useState} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const addToast = useToastStore(s => s.addToast);
  const setEvent = useEventStore(s => s.setEvent);
  const eventUpdate = useEventStore(s => s.event);
  const setIsEditing = useEventStore(s => s.setIsEditing);
  const [updateEvent] = useUpdateEventMutation();
  const [isAddToMyEvent, setIsAddToMyEvent] = useState(false);
  const {data: {eventByUUID: event} = {}} = useEventByUuidQuery({
    pollInterval: POLL_INTERVAL,
    variables: {uuid: eventUUID},
  });

  useEffect(() => {
    if (event) setEvent(event as EventType);
  }, [event]);

  if (!event) return <ErrorPage statusCode={404} title={t`event.not_found`} />;

  const onSave = async e => {
    try {
      const {uuid, ...data} = eventUpdate;
      const {id, __typename, travels, users, waitingList, ...input} = data;
      await updateEvent({
        variables: {uuid, eventUpdate: input as EditEventInput},
        refetchQueries: ['eventByUUID'],
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      addToast(t('event.errors.cant_update'));
    }
  };

  return (
    <Layout
      pageTitle={t('event.title', {title: event.name})}
      menuTitle={t('event.title', {title: event.name})}
      displayMenu={false}
      Topbar={() => (
        <EventBar event={event} onAdd={setIsAddToMyEvent} onSave={onSave} />
      )}
    >
      <Box
        flex={1}
        display="flex"
        alignItems="stretch"
        flexDirection={isMobile ? 'column-reverse' : 'row'}
      >
        <DrawerMenu />
        <Box flex={1}>
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
