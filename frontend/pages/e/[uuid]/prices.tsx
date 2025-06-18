import {PropsWithChildren} from 'react';
import {
  EventByUuidDocument,
  Module,
  ModuleDocument,
  Enum_Userspermissionsuser_Lang as SupportedLocales,
} from '../../../generated/graphql';
import EventLayout, {TabComponent} from '../../../layouts/Event';
import useEventStore from '../../../stores/useEventStore';
import {Box, Container, useTheme} from '@mui/material';
import Head from 'next/head';
import {useSession} from 'next-auth/react';
import pageUtils from '../../../lib/pageUtils';
import {getLocaleForLang} from '../../../lib/getLocale';

interface Props {
  modulesSettings?: Module;
  eventUUID: string;
  announcement?: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  return <EventLayout {...props} Tab={PricesPage} />;
};

const PricesPage: TabComponent<Props> = ({modulesSettings}) => {
  const theme = useTheme();
  const event = useEventStore(s => s.event);
  const session = useSession();
  const profile = session?.data?.profile;

  const carosterPlusActivated =
    modulesSettings?.caroster_plus_enabled &&
    event?.enabled_modules?.includes('caroster-plus');

  if (!event && !carosterPlusActivated) return null;

  return (
    <Box position="relative">
      <Head>
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      </Head>
      <Container
        sx={{
          p: 4,
          mt: 6,
          mb: 11,
          mx: 0,
          [theme.breakpoints.down('md')]: {
            p: 2,
            mt: 13,
          },
        }}
      >
        <Box mb={4}>
          {modulesSettings && (
            /* @ts-ignore */
            <stripe-pricing-table
              pricing-table-id={modulesSettings.caroster_plus_pricing_grid_id}
              publishable-key={modulesSettings.caroster_plus_publishable_key}
              client-reference-id={event.uuid}
              customer-email={profile?.email}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export const getServerSideProps = pageUtils.getServerSideProps(
  async (context, apolloClient) => {
    const {uuid} = context.query;
    const {host = ''} = context.req.headers;
    let event = null;
    let modulesSettings = null;

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

    // Fetch module settings
    try {
      const {data} = await apolloClient.query({
        query: ModuleDocument,
        variables: {locale: context.locale},
      });
      modulesSettings = data?.module?.data?.attributes || null;

      if (!modulesSettings?.caroster_plus_pricing_grid_id) {
        console.warn(
          'Module settings are not set for locale: ',
          context.locale,
          ' fallback to English'
        );
        const {data: enData} = await apolloClient.query({
          query: ModuleDocument,
          variables: {locale: SupportedLocales['en']},
        });
        modulesSettings = enData?.module?.data?.attributes || null;
      }
    } catch (error) {
      console.error("Can't fetch config for module: ", error);
    }

    const description = await getLocaleForLang(
      event?.attributes?.lang,
      'meta.description'
    );

    return {
      props: {
        modulesSettings,
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
