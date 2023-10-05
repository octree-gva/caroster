import {useState, useReducer, PropsWithChildren} from 'react';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';
import {getSession, useSession} from 'next-auth/react';
import TravelColumns from '../../../containers/TravelColumns';
import NewTravelDialog from '../../../containers/NewTravelDialog';
import VehicleChoiceDialog from '../../../containers/VehicleChoiceDialog';
import Fab from '../../../containers/Fab';
import pageUtils from '../../../lib/pageUtils';
import EventLayout, {TabComponent} from '../../../layouts/Event';
import {
  EventByUuidDocument,
  FindUserVehiclesDocument,
  useFindUserVehiclesQuery,
} from '../../../generated/graphql';

interface Props {
  eventUUID: string;
  announcement?: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  return <EventLayout {...props} Tab={TravelsTab} />;
};

const TravelsTab: TabComponent = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const session = useSession();
  const [openNewTravelContext, toggleNewTravel] = useState({opened: false});
  const [openVehicleChoice, toggleVehicleChoice] = useReducer(i => !i, false);

  const isAuthenticated = session.status === 'authenticated';
  const {data} = useFindUserVehiclesQuery({
    skip: !isAuthenticated,
  });
  const vehicles = data?.me?.profile?.vehicles?.data || [];

  const addTravelClickHandler =
    isAuthenticated && vehicles?.length != 0
      ? toggleVehicleChoice
      : () => toggleNewTravel({opened: true});

  return (
    <Box>
      <TravelColumns toggle={addTravelClickHandler} />
      <Fab
        onClick={addTravelClickHandler}
        aria-label="add-car"
        sx={{
          bottom: 0,
          right: theme.spacing(6),

          [theme.breakpoints.down('md')]: {
            right: theme.spacing(1),
            bottom: 56,
          },
        }}
      >
        {t('travel.creation.title')}
      </Fab>
      <NewTravelDialog
        context={openNewTravelContext}
        toggle={() => toggleNewTravel({opened: false})}
      />
      <VehicleChoiceDialog
        open={openVehicleChoice}
        toggle={toggleVehicleChoice}
        toggleNewTravel={toggleNewTravel}
        vehicles={vehicles}
      />
    </Box>
  );
};

export const getServerSideProps = pageUtils.getServerSideProps(
  async (context, apolloClient) => {
    const {uuid} = context.query;
    const {host = ''} = context.req.headers;
    const session = await getSession(context);
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

    // Fetch user vehicles
    if (session)
      await apolloClient.query({
        query: FindUserVehiclesDocument,
      });

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
