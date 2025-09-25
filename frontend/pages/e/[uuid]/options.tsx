import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {PropsWithChildren} from 'react';
import pageUtils from '../../../lib/pageUtils';
import useEventStore from '../../../stores/useEventStore';
import EventLayout, {TabComponent} from '../../../layouts/Event';
import {EventByUuidDocument} from '../../../generated/graphql';
import CarosterPlusSettings from '../../../containers/CarosterPlusSettings';
import {getLocaleForLang} from '../../../lib/getLocale';
import theme from '../../../theme';

interface Props {
  eventUUID: string;
  announcement?: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  return <EventLayout {...props} Tab={OptionsTab} />;
};

const OptionsTab: TabComponent<Props> = () => {
  const event = useEventStore(s => s.event);

  if (!event) return null;

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
            mt: 13,
          },
        }}
      >
        <CarosterPlusSettings event={event} />
      </Container>
    </Box>
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

    const carosterPlusActivated =
      event?.attributes?.enabled_modules?.includes('caroster-plus');

    if (!carosterPlusActivated)
      return {
        redirect: {
          destination: `/e/${uuid}/prices`,
          permanent: false,
        },
      };

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
