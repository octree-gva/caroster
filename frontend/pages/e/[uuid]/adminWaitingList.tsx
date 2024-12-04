import {PropsWithChildren} from 'react';
import EventLayout, {TabComponent} from '../../../layouts/Event';
import pageUtils from '../../../lib/pageUtils';
import {EventByUuidDocument} from '../../../generated/graphql';
import TripAlertsList from '../../../containers/TripAlertsList';

interface Props {
  eventUUID: string;
  announcement?: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  return <EventLayout {...props} Tab={WaitingListTab} tabProps={props} />;
};

const WaitingListTab: TabComponent<Props> = ({event}) => {
  return <TripAlertsList />;
};

export const getServerSideProps = pageUtils.getServerSideProps(
  async (context, apolloClient, session) => {
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
    if (!isCarosterPlus)
      return {
        notFound: true,
      };

    const userEmail = session?.user?.email;
    const userIsAdmin =
      event?.attributes?.adminstrators?.includes(userEmail) ||
      event?.attributes?.email === userEmail;
    if (!userIsAdmin) return {notFound: true};

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
