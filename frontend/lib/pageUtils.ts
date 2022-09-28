import {ApolloClient} from '@apollo/client';
import {getSession} from 'next-auth/react';
import {ProfileDocument, SettingDocument} from '../generated/graphql';
import {initializeApollo, APOLLO_STATE_PROP_NAME} from './apolloClient';
import {getCookie} from './cookies';

type ServerSideExtension = (
  context: any,
  apolloClient: ApolloClient<any>
) => Promise<ExtensionResult | void>;

type ExtensionResult = {
  props?: Object;
  notFound?: boolean;
};

const getServerSideProps =
  (extension?: ServerSideExtension) => async (context: any) => {
    const session = await getSession(context);
    const {STRAPI_URL = 'http://localhost:1337'} = process.env;
    const apolloClient = initializeApollo(`${STRAPI_URL}/graphql`, session);
    const locale = session?.user?.lang || 'fr';

    try {
      const {
        data: {setting = {}},
      } = await apolloClient.query({
        query: SettingDocument,
        variables: {locale},
      });
      let announcement = setting?.data?.attributes?.announcement || '';
      const lastAnnouncementSeen = getCookie(
        'lastAnnouncementSeen',
        context.req.headers.cookie
      );

      if (!announcement || announcement === lastAnnouncementSeen)
        announcement = null;

      if (session)
        await apolloClient.query({
          query: ProfileDocument,
        });

      let extensionProps = {};
      if (extension) {
        const extensionReturn = await extension(context, apolloClient);
        extensionProps = extensionReturn?.props || {};
        if (extensionReturn?.notFound) {
          return {
            notFound: true,
          };
        }
      }

      return {
        props: {
          session,
          announcement,
          [APOLLO_STATE_PROP_NAME]: apolloClient.cache.extract(),
          ...extensionProps,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        props: {session},
      };
    }
  };

export default {
  getServerSideProps,
};
