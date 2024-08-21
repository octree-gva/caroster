import {ApolloClient} from '@apollo/client';
import {getSession} from 'next-auth/react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {ProfileDocument, SettingDocument} from '../generated/graphql';
import {initializeApollo, APOLLO_STATE_PROP_NAME} from './apolloClient';
import {getCookie, hashText} from './cookies';
import nextI18NextConfig from '../next-i18next.config';

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

    const jwt = session?.token?.jwt;
    const apolloClient = initializeApollo(`${STRAPI_URL}/graphql/`, jwt);
    const translations = await serverSideTranslations(
      context.locale,
      ['common'],
      nextI18NextConfig
    );

    try {
      const {
        data: {setting = {}},
      } = await apolloClient.query({
        query: SettingDocument,
        variables: {locale: context.locale},
      });
      let announcement = setting?.data?.attributes?.announcement || '';

      if (!announcement) announcement = null;
      else {
        const lastAnnouncementSeen = getCookie(
          'lastAnnouncementSeen',
          context.req.headers.cookie
        );
        const hashedAnnouncement = hashText(announcement);
        if (hashedAnnouncement === lastAnnouncementSeen) {
          announcement = null;
        }
      }

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
          ...translations,
          ...extensionProps,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        props: {session, ...translations},
      };
    }
  };

export default {
  getServerSideProps,
};
