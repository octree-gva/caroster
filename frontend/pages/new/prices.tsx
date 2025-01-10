import pageUtils from '../../lib/pageUtils';
import Layout from '../../layouts/EventCreation';
import {Box, Paper, Typography} from '@mui/material';
import {
  Module,
  ModuleDocument,
  Enum_Userspermissionsuser_Lang as SupportedLocales,
} from '../../generated/graphql';
import {useTranslation} from 'react-i18next';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';

interface Props {
  modulesSettings?: Module;
  announcement?: string;
}
const PlusPrices = (props: Props) => {
  const {modulesSettings} = props;
  const {t} = useTranslation();
  const session = useSession();
  const profile = session?.data?.profile;
  const router = useRouter();
  const eventUUID = router.query.eventId;

  if (
    !modulesSettings?.caroster_plus_pricing_grid_id ||
    !modulesSettings.caroster_plus_publishable_key ||
    !eventUUID
  )
    return (
      <Layout {...props}>
        <Typography>{t`options.no_module`}</Typography>
      </Layout>
    );

  return (
    <Layout {...props} maxWidth="xl">
      <Head>
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      </Head>
      <Box component={Paper} mb={4}>
        {/* @ts-ignore */}
        <stripe-pricing-table
          pricing-table-id={modulesSettings.caroster_plus_pricing_grid_id}
          publishable-key={modulesSettings.caroster_plus_publishable_key}
          client-reference-id={eventUUID}
          customer-email={profile?.email}
        />
      </Box>
    </Layout>
  );
};

export const getServerSideProps = pageUtils.getServerSideProps(
  async (context, apolloClient) => {
    let modulesSettings = null;

    // Fetch module settings
    try {
      const {data} = await apolloClient.query({
        query: ModuleDocument,
        variables: {locale: context.locale},
      });
      modulesSettings = data?.module?.data?.attributes || {};

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
        modulesSettings = enData?.module?.data?.attributes;
      }
    } catch (error) {
      console.error("Can't fetch config for module: ", error);
    }

    return {props: {modulesSettings}};
  }
);

export default PlusPrices;
