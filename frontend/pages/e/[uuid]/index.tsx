import {useState, useReducer, PropsWithChildren, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import EventLayout, {TabComponent} from '../../../layouts/Event';
import TravelColumns from '../../../containers/TravelColumns';
import NewTravelDialog from '../../../containers/NewTravelDialog';
import VehicleChoiceDialog from '../../../containers/VehicleChoiceDialog';
import {
  EventByUuidDocument,
  useFindUserVehiclesLazyQuery,
} from '../../../generated/graphql';
import useProfile from '../../../hooks/useProfile';
import Fab from '../../../containers/Fab';
import {
  initializeApollo,
  APOLLO_STATE_PROP_NAME,
} from '../../../lib/apolloClient';

interface Props {
  eventUUID: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  return <EventLayout {...props} Tab={TravelsTab} />;
};

const TravelsTab: TabComponent = (props: {event}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const {user} = useProfile();
  const [findUserVehicle, {data}] = useFindUserVehiclesLazyQuery();
  const vehicles = data?.me?.profile?.vehicles?.data || [];
  const [openNewTravelContext, toggleNewTravel] = useState({opened: false});
  const [openVehicleChoice, toggleVehicleChoice] = useReducer(i => !i, false);

  useMemo(() => {
    if (user) findUserVehicle();
  }, [user]);

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
  const {host = ''} = ctx.req.headers;

  const apolloClient = initializeApollo();
  const {data: {eventByUUID: {data: event = null} = {}} = {}} =
    await apolloClient.query({
      query: EventByUuidDocument,
      variables: {uuid},
    });

  try {
    return {
      props: {
        [APOLLO_STATE_PROP_NAME]: apolloClient.cache.extract(),
        eventUUID: uuid,
        metas: {
          title: event?.name || '',
          url: `https://${host}${ctx.resolvedUrl}`,
        },
      },
    };
  } catch (error) {
    console.error(error);
    return {props: {}};
  }
}

export default Page;
