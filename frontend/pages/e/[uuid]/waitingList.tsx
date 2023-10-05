import {useState, useMemo, PropsWithChildren} from 'react';
import EventLayout, {TabComponent} from '../../../layouts/Event';
import {EventByUuidDocument} from '../../../generated/graphql';
import useProfile from '../../../hooks/useProfile';
import WaitingList from '../../../containers/WaitingList';
import {AddPassengerToWaitingList} from '../../../containers/NewPassengerDialog';
import pageUtils from '../../../lib/pageUtils';
import Box from '@mui/material/Box';
import SupportCaroster from '../../../containers/SupportCaroster';

interface NewPassengerDialogContext {
  addSelf: boolean;
}

interface Props {
  eventUUID: string;
  announcement?: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  return <EventLayout {...props} Tab={WaitingListTab} />;
};

const WaitingListTab: TabComponent = ({event}) => {
  const {userId} = useProfile();
  const [addPassengerToWaitingListContext, toggleNewPassengerToWaitingList] =
    useState<NewPassengerDialogContext | null>(null);

  const canAddSelf = useMemo(() => {
    if (!userId) return false;
    const isInWaitingList = event?.waitingPassengers?.data?.some(
      passenger => passenger.attributes.user?.data?.id === `${userId}`
    );
    const isInTravel = event?.travels?.data?.some(travel =>
      travel.attributes.passengers?.data?.some(
        passenger => passenger.attributes.user?.data?.id === `${userId}`
      )
    );
    return !(isInWaitingList || isInTravel);
  }, [event, userId]);

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

export const getServerSideProps = pageUtils.getServerSideProps(
  async (context, apolloClient) => {
    const {uuid} = context.query;
    const {host = ''} = context.req.headers;
    let event = null;

    // Fetch event
    try {
      const {data} = await apolloClient.query({
        query: EventByUuidDocument,
        variables: {uuid},
      });
      event = data?.eventByUUID?.data;
    } catch (error) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        eventUUID: uuid,
        metas: {
          title: event?.attributes?.name || '',
          url: `https://${host}${context.resolvedUrl}`,
        },
      },
    };
  }
);

export default Page;
