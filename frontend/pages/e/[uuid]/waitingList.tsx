import {useState, useMemo, PropsWithChildren, useReducer} from 'react';
import useProfile from '../../../hooks/useProfile';
import WaitingList from '../../../containers/WaitingList';
import pageUtils from '../../../lib/pageUtils';
import EventLayout, {TabComponent} from '../../../layouts/Event';
import {AddPassengerToWaitingList} from '../../../containers/NewPassengerDialog';
import {EventByUuidDocument} from '../../../generated/graphql';

interface Props {
  eventUUID: string;
  announcement?: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  return <EventLayout {...props} Tab={WaitingListTab} />;
};

const WaitingListTab: TabComponent<Props> = ({event}) => {
  const {userId} = useProfile();
  const [dialogOpen, toggleDialog] = useReducer(i => !i, false);
  const [isSelfAdd, setIsSelfAdd] = useState(false);

  const registered = useMemo(() => {
    if (!userId) return false;
    const isInWaitingList = event?.waitingPassengers?.data?.some(
      passenger => passenger.attributes.user?.data?.id === `${userId}`
    );
    return isInWaitingList;
  }, [event, userId]);

  return (
    <>
      <WaitingList
        registered={registered}
        canAddSelf={!!userId}
        onAddSelf={() => {
          setIsSelfAdd(true);
          toggleDialog();
        }}
        onAddOther={() => {
          setIsSelfAdd(false);
          toggleDialog();
        }}
      />
      <AddPassengerToWaitingList
        open={dialogOpen}
        toggle={toggleDialog}
        addSelf={isSelfAdd}
      />
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

    const isCarosterPlus =
      event?.attributes?.enabled_modules?.includes('caroster-plus');
    if (isCarosterPlus)
      return {
        notFound: true,
      };

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
