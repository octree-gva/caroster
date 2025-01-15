import {PropsWithChildren} from 'react';
import TravelColumns from '../../../containers/TravelColumns';
import pageUtils from '../../../lib/pageUtils';
import EventLayout from '../../../layouts/Event';
import {EventByUuidDocument} from '../../../generated/graphql';
import {getLocaleForLang} from '../../../lib/getLocale';
import {getSession} from 'next-auth/react';

interface Props {
  eventUUID: string;
  announcement?: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  return <EventLayout {...props} Tab={TravelColumns} />;
};

export const getServerSideProps = pageUtils.getServerSideProps(
  async (context, apolloClient) => {
    const {uuid} = context.query;
    const {host = ''} = context.req.headers;
    const session = await getSession(context);
    let event = null;

    const userHasNotAcceptedTos =
      !!session?.profile && !session.profile.tosAcceptationDate;
    if (userHasNotAcceptedTos)
      return {
        redirect: {
          destination: '/auth/confirm',
          permanent: false,
        },
      };

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

    const description = await getLocaleForLang(
      event?.attributes?.lang,
      'meta.description'
    );

    return {
      props: {
        eventUUID: uuid,
        metas: {
          title: event?.attributes?.name || '',
          description,
          url: `https://${host}${context.resolvedUrl}`,
        },
      },
    };
  }
);

export default Page;
