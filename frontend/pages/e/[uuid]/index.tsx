import {useState, useReducer, PropsWithChildren} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import EventLayout, { TabComponent } from '../../../layouts/Event';
import TravelColumns from '../../../containers/TravelColumns';
import NewTravelDialog from '../../../containers/NewTravelDialog';
import VehicleChoiceDialog from '../../../containers/VehicleChoiceDialog';
import {
  EventByUuidDocument,
  useFindUserVehiclesQuery,
} from '../../../generated/graphql';
import useProfile from '../../../hooks/useProfile';
import Fab from '../../../containers/Fab';
import useBannerStore from '../../../stores/useBannerStore';
import {initializeApollo} from '../../../lib/apolloClient';

interface Props {
  eventUUID: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  return <EventLayout {...props} Tab={TravelsTab} />;
};

const TravelsTab: TabComponent = (props: {event}) => {
  const bannerOffset = useBannerStore(s => s.offset);
  const classes = useStyles({bannerOffset});
  const {t} = useTranslation();
  const {user} = useProfile();
  const {data: {me: {profile: {vehicles = []} = {}} = {}} = {}, loading} =
    useFindUserVehiclesQuery();
  const [openNewTravelContext, toggleNewTravel] = useState({opened: false});
  const [openVehicleChoice, toggleVehicleChoice] = useReducer(i => !i, false);

  const addTravelClickHandler =
    user && vehicles?.length != 0
      ? toggleVehicleChoice
      : () => toggleNewTravel({opened: true});

  return (
    <>
      <TravelColumns toggle={addTravelClickHandler} />
      <Fab
        onClick={addTravelClickHandler}
        aria-label="add-car"
        color="primary"
        className={classes.bottomRight}
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
    </>
  );
};

const useStyles = makeStyles(theme => ({
  bottomRight: {
    bottom: 0,
    right: theme.spacing(6),

    [theme.breakpoints.down('sm')]: {
      right: theme.spacing(1),
      bottom: 56,
    },
  },
}));

export async function getServerSideProps(ctx) {
  const {uuid} = ctx.query;
  const apolloClient = initializeApollo();
  const {data = {}} = await apolloClient.query({
    query: EventByUuidDocument,
    variables: {uuid},
  });
  const {eventByUUID: event} = data;
  const {host = ''} = ctx.req.headers;

  return {
    props: {
      event,
      eventUUID: uuid,
      metas: {
        title: event?.name || '',
        url: `https://${host}${ctx.resolvedUrl}`,
      },
    },
  };
}

export default Page;
