import {useState, PropsWithChildren} from 'react';
import Box from '@mui/material/Box';
import TravelColumns from '../../../containers/TravelColumns';
import NewTravelDialog from '../../../containers/NewTravelDialog';
import pageUtils from '../../../lib/pageUtils';
import EventLayout, {TabComponent} from '../../../layouts/Event';
import {EventByUuidDocument} from '../../../generated/graphql';
import {getLocaleForLang} from '../../../lib/getLocale';

interface Props {
  eventUUID: string;
  announcement?: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  return <EventLayout {...props} Tab={TravelsTab} />;
};

const TravelsTab: TabComponent<Props> = () => {
  const [openNewTravelDialog, setNewTravelDialog] = useState(false);

  return (
    <Box>
      <TravelColumns showTravelModal={() => setNewTravelDialog(true)} />
      <NewTravelDialog
        opened={openNewTravelDialog}
        toggle={() => setNewTravelDialog(false)}
      />
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
