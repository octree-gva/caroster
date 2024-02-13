import {useState, useReducer, PropsWithChildren} from 'react';
import Box from '@mui/material/Box';
import {useTranslation} from 'react-i18next';
import {getSession, useSession} from 'next-auth/react';
import TravelColumns from '../../../containers/TravelColumns';
import NewTravelDialog from '../../../containers/NewTravelDialog';
import VehicleChoiceDialog from '../../../containers/VehicleChoiceDialog';
import Fab from '../../../containers/Fab';
import pageUtils from '../../../lib/pageUtils';
import usePermissions from '../../../hooks/usePermissions';
import EventLayout, {TabComponent} from '../../../layouts/Event';
import {
  EventByUuidDocument,
  FindUserVehiclesDocument,
  VehicleEntity,
  useFindUserVehiclesQuery,
} from '../../../generated/graphql';

interface Props {
  eventUUID: string;
  announcement?: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  return <EventLayout {...props} Tab={TravelsTab} />;
};

const TravelsTab: TabComponent<Props> = () => {
  const {t} = useTranslation();
  const session = useSession();
  const {
    userPermissions: {canAddTravel},
  } = usePermissions();
  const [openNewTravelDialog, setNewTravelDialog] = useState(false);
  const [openVehicleChoice, toggleVehicleChoice] = useReducer(i => !i, false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleEntity>();

  const isAuthenticated = session.status === 'authenticated';
  const {data} = useFindUserVehiclesQuery({
    skip: !isAuthenticated,
  });
  const vehicles = data?.me?.profile?.vehicles?.data || [];

  const addTravelClickHandler =
    isAuthenticated && vehicles?.length != 0
      ? toggleVehicleChoice
      : () => setNewTravelDialog(true);

  return (
    <Box>
      <TravelColumns toggle={addTravelClickHandler} />
      {canAddTravel && (
        <Fab onClick={addTravelClickHandler} aria-label="add-car">
          {t('travel.creation.title')}
        </Fab>
      )}
      <NewTravelDialog
        key={selectedVehicle?.id || 'noVehicle'}
        opened={openNewTravelDialog}
        toggle={() => setNewTravelDialog(false)}
        selectedVehicle={selectedVehicle}
      />
      <VehicleChoiceDialog
        open={openVehicleChoice}
        toggle={toggleVehicleChoice}
        setNewTravelDialog={setNewTravelDialog}
        setSelectedVehicle={setSelectedVehicle}
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
