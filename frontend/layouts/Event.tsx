import {PropsWithChildren, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
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
import useBannerStore from '../stores/useBannerStore';
import DrawerMenu from '../containers/DrawerMenu';
import AddToMyEventDialog from '../containers/AddToMyEventDialog';
import useToastStore from '../stores/useToastStore';

const POLL_INTERVAL = 10000;

export type TabComponent = (props: {event: EventType}) => JSX.Element;

interface Props {
  eventUUID: string;
  Tab: TabComponent;
}

const EventLayout = (props: PropsWithChildren<Props>) => {
  const {eventUUID, Tab} = props;
  const bannerOffset = useBannerStore(s => s.offset);
  const classes = useStyles({bannerOffset});
  const {t} = useTranslation();
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
      className={classes.layout}
      pageTitle={t('event.title', {title: event.name})}
      menuTitle={t('event.title', {title: event.name})}
      displayMenu={false}
    >
      <EventBar event={event} onAdd={setIsAddToMyEvent} onSave={onSave} />
      <DrawerMenu />
      <Tab event={event} />
      <AddToMyEventDialog
        event={event}
        open={isAddToMyEvent}
        onClose={() => setIsAddToMyEvent(false)}
      />
    </Layout>
  );
};

const useStyles = makeStyles(theme => ({
  layout: ({bannerOffset}) => ({
    paddingTop: theme.mixins.toolbar.minHeight + bannerOffset,
  }),
}));

export default EventLayout;
