import {useState, useReducer, PropsWithChildren} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import EventLayout, {TabComponent} from '../../../layouts/Event';
import TravelColumns from '../../../containers/TravelColumns';
import NewTravelDialog from '../../../containers/NewTravelDialog';
import VehicleChoiceDialog from '../../../containers/VehicleChoiceDialog';
import {
  EventByUuidDocument,
  FindUserVehiclesDocument,
  useFindUserVehiclesQuery,
} from '../../../generated/graphql';
import Fab from '../../../containers/Fab';
import pageUtils from '../../../lib/pageUtils';
import {getSession, useSession} from 'next-auth/react';

interface Props {
  eventUUID: string;
  announcement?: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  return <EventLayout {...props} Tab={TravelsTab} />;
};

const TravelsTab: TabComponent = (props: {event}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';
  const {data} = useFindUserVehiclesQuery({
    skip: !isAuthenticated,
  });
  const vehicles = data?.me?.profile?.vehicles?.data || [];
  const [openNewTravelContext, toggleNewTravel] = useState({opened: false});
  const [openVehicleChoice, toggleVehicleChoice] = useReducer(i => !i, false);

  const addTravelClickHandler =
    isAuthenticated && vehicles?.length != 0
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
