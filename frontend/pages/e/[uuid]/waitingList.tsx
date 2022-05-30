import {useState, useEffect, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {initializeApollo} from '../../../lib/apolloClient';
import useToastStore from '../../../stores/useToastStore';
import useEventStore from '../../../stores/useEventStore';
import Layout from '../../../layouts/Default';
import {Travel as TravelType} from '../../../generated/graphql';
import EventBar from '../../../containers/EventBar';
import Loading from '../../../containers/Loading';
import {
  useUpdateEventMutation,
  Event as EventType,
  useEventByUuidQuery,
  EventByUuidDocument,
  EditEventInput,
  useFindUserVehiclesQuery,
} from '../../../generated/graphql';
import ErrorPage from '../../_error';
import useProfile from '../../../hooks/useProfile';
import useBannerStore from '../../../stores/useBannerStore';
import DrawerMenu from '../../../containers/DrawerMenu';
import WaitingList from '../../../containers/WaitingList';
import {
  AddPassengerToTravel,
  AddPassengerToWaitingList,
} from '../../../containers/NewPassengerDialog';
import AddToMyEventDialog from '../../../containers/AddToMyEventDialog';

const POLL_INTERVAL = 10000;

interface NewPassengerDialogContext {
  addSelf: boolean;
}

interface Props {
  event: EventType;
  eventUUID: string;
}

const EventPage = props => {
  const {t} = useTranslation();
  const {event} = props;
  if (!event) return <ErrorPage statusCode={404} title={t`event.not_found`} />;
  return <Event {...props} />;
};

const Event = (props: Props) => {
  const {eventUUID} = props;
  const bannerOffset = useBannerStore(s => s.offset);
  const classes = useStyles({bannerOffset});
  const {t} = useTranslation();
  const {user} = useProfile();
  const {data: {me: {profile: {vehicles = []} = {}} = {}} = {}, loading} =
    useFindUserVehiclesQuery();
  const addToast = useToastStore(s => s.addToast);
  const setEvent = useEventStore(s => s.setEvent);
  const eventUpdate = useEventStore(s => s.event);
  const setIsEditing = useEventStore(s => s.setIsEditing);
  const [isAddToMyEvent, setIsAddToMyEvent] = useState(false);
  const [addPassengerToWaitingListContext, toggleNewPassengerToWaitingList] =
    useState<NewPassengerDialogContext | null>(null);
  const [updateEvent] = useUpdateEventMutation();
  const {data: {eventByUUID: event} = {}} = useEventByUuidQuery({
    pollInterval: POLL_INTERVAL,
    variables: {uuid: eventUUID},
  });

  useEffect(() => {
    if (event) setEvent(event as EventType);
  }, [event]);

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

  const canAddSelf = useMemo(() => {
    if (!user) return false;
    const isInWaitingList = event?.waitingPassengers?.some(
      passenger => passenger.user?.id === `${user.id}`
    );
    const isInTravel = event?.travels.some(travel =>
      travel.passengers.some(passenger => passenger.user?.id === `${user.id}`)
    );
    return !(isInWaitingList || isInTravel);
  }, [event, user]);

  if (!event || loading) return <Loading />;

  return (
    <Layout
      className={classes.layout}
      pageTitle={t('event.title', {title: event.name})}
      menuTitle={t('event.title', {title: event.name})}
      displayMenu={false}
    >
      <EventBar event={event} onAdd={setIsAddToMyEvent} onSave={onSave} />
      <DrawerMenu />
      <WaitingList
        canAddSelf={canAddSelf}
        getToggleNewPassengerDialogFunction={(addSelf: boolean) => () =>
          toggleNewPassengerToWaitingList({addSelf})}
      />
      <AddToMyEventDialog
        event={event}
        open={isAddToMyEvent}
        onClose={() => setIsAddToMyEvent(false)}
      />
      {!!addPassengerToWaitingListContext && (
        <AddPassengerToWaitingList
          open={!!addPassengerToWaitingListContext}
          toggle={() => toggleNewPassengerToWaitingList(null)}
          addSelf={addPassengerToWaitingListContext.addSelf}
        />
      )}
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const {uuid} = ctx.query;
  const apolloClient = initializeApollo();
  const {data = {}} = await apolloClient.query({
    query: EventByUuidDocument,
    variables: {uuid},
  });
  const {eventByUUID: event} = data;
  const {host = ''} = ctx.req.headers;

  return {
    props: {
      event,
      eventUUID: uuid,
      metas: {
        title: event?.name || '',
        url: `https://${host}${ctx.resolvedUrl}`,
      },
    },
  };
}

const useStyles = makeStyles(theme => ({
  layout: ({bannerOffset}) => ({
    paddingTop: theme.mixins.toolbar.minHeight + bannerOffset,
  }),
}));

export default EventPage;
