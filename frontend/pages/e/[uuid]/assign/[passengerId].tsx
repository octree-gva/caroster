import {PropsWithChildren} from 'react';
import {useRouter} from 'next/router';
import pageUtils from '../../../../lib/pageUtils';
import EventLayout from '../../../../layouts/Event';
import {EventByUuidDocument} from '../../../../generated/graphql';
import AssignPassenger from '../../../../containers/AssignPassenger';

interface Props {
  eventUUID: string;
  announcement?: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  const {push} = useRouter();
  return (
    <EventLayout
      {...props}
      Tab={AssignPassenger}
      goBack={() => push(`/e/${props.eventUUID}/waitingList`)}
    />
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
