import {useState, useMemo, PropsWithChildren} from 'react';
import EventLayout, {TabComponent} from '../../../layouts/Event';
import {EventByUuidDocument} from '../../../generated/graphql';
import useProfile from '../../../hooks/useProfile';
import WaitingList from '../../../containers/WaitingList';
import {AddPassengerToWaitingList} from '../../../containers/NewPassengerDialog';
import {initializeApollo} from '../../../lib/apolloClient';

interface NewPassengerDialogContext {
  addSelf: boolean;
}

interface Props {
  eventUUID: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  return <EventLayout {...props} Tab={WaitingListTab} />;
};

const WaitingListTab: TabComponent = ({event}) => {
  const {user} = useProfile();
  const [addPassengerToWaitingListContext, toggleNewPassengerToWaitingList] =
    useState<NewPassengerDialogContext | null>(null);

  const canAddSelf = useMemo(() => {
    if (!user) return false;
    const isInWaitingList = event?.waitingPassengers?.data?.some(
      passenger => passenger.attributes.user?.data?.id === `${user.id}`
    );
    const isInTravel = event?.travels?.data?.some(travel =>
      travel.attributes.passengers?.data?.some(
        passenger => passenger.attributes.user?.data?.id === `${user.id}`
      )
    );
    return !(isInWaitingList || isInTravel);
  }, [event, user]);

  return (
    <>
      <WaitingList
        canAddSelf={canAddSelf}
        getToggleNewPassengerDialogFunction={(addSelf: boolean) => () =>
          toggleNewPassengerToWaitingList({addSelf})}
      />
      {!!addPassengerToWaitingListContext && (
        <AddPassengerToWaitingList
          open={!!addPassengerToWaitingListContext}
          toggle={() => toggleNewPassengerToWaitingList(null)}
          addSelf={addPassengerToWaitingListContext.addSelf}
        />
      )}
    </>
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

export default Page;
