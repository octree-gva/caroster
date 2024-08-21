import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {useTheme} from '@mui/material/styles';
import {PropsWithChildren} from 'react';
import pageUtils from '../../../lib/pageUtils';
import useEventStore from '../../../stores/useEventStore';
import EventLayout, {TabComponent} from '../../../layouts/Event';
import {
  EventByUuidDocument,
  Module,
  ModuleDocument,
  Enum_Userspermissionsuser_Lang as SupportedLocales,
} from '../../../generated/graphql';
import CarosterPlusOption from '../../../containers/CarosterPlusOption';
import CarosterPlusSettings from '../../../containers/CarosterPlusSettings';
import {Card, Typography} from '@mui/material';
import {useTranslation} from 'next-i18next';

interface Props {
  modulesSettings?: Module;
  eventUUID: string;
  announcement?: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  return <EventLayout {...props} Tab={OptionsTab} />;
};

const OptionsTab: TabComponent<Props> = ({modulesSettings}) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const event = useEventStore(s => s.event);

  if (!event) return null;

  const carosterPlusActivated =
    modulesSettings?.caroster_plus_enabled &&
    event.enabled_modules?.includes('caroster-plus');

  return (
    <Box position="relative">
      <Container
        sx={{
          p: 4,
          mt: 6,
          mb: 11,
          mx: 0,
          [theme.breakpoints.down('md')]: {
            p: 2,
          },
        }}
      >
        {carosterPlusActivated && <CarosterPlusSettings event={event} />}{' '}
        {modulesSettings?.caroster_plus_enabled && !carosterPlusActivated && (
          <CarosterPlusOption event={event} modulesSettings={modulesSettings} />
        )}
        {!modulesSettings?.caroster_plus_enabled && (
          <Typography variant="overline">{t`options.no_module`}</Typography>
        )}
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

    // Fetch modules settings
    try {
      const {data} = await apolloClient.query({
        query: ModuleDocument,
        variables: {locale: context.locale},
      });
      modulesSettings = data?.module?.data?.attributes || {};

      const {caroster_plus_description, caroster_plus_name} = modulesSettings;

      if (
        caroster_plus_description &&
        caroster_plus_name &&
        String(caroster_plus_description).length === 0 &&
        String(caroster_plus_name).length === 0
      ) {
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
      console.error(error);
    }

    return {
      props: {
        modulesSettings,
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
