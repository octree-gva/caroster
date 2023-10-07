import {PropsWithChildren} from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import pageUtils from '../../../../lib/pageUtils';
import useEventStore from '../../../../stores/useEventStore';
import ShareEvent from '../../../../containers/ShareEvent';
import getMapsLink from '../../../../lib/getMapsLink';
import useToastStore from '../../../../stores/useToastStore';
import EventLayout from '../../../../layouts/Event';
import {EventByUuidDocument} from '../../../../generated/graphql';
import usePassengersActions from '../../../../hooks/usePassengersActions';

interface Props {
  eventUUID: string;
  announcement?: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  return <EventLayout {...props} Tab={AssignPassenger} />;
};

const AssignPassenger = () => {
  const {t} = useTranslation();
  const {addToast, clearToast} = useToastStore(s => s);
  const event = useEventStore(s => s.event);

  const router = useRouter();
  const {
    query: {passengerId},
  } = router;
  const {updatePassenger} = usePassengersActions();

  if (!event) {
    return null;
  }
  const {travels, name, waitingPassengers, uuid} = event;

  const availableTravels = travels?.data?.filter(
    ({attributes}) =>
      attributes.passengers &&
      attributes?.seats > attributes.passengers.data.length
  );
  const passenger = waitingPassengers.data?.find(
    waitingPassenger => waitingPassenger.id === passengerId
  );

  const assign = async travel => {
    try {
      await updatePassenger(passengerId, {
        travel: travel.id,
      });
      addToast(
        t('passenger.success.added_to_car', {
          name: passenger.attributes.name,
        }),
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => {
            router.push(`/e/${uuid}`);
            clearToast();
          }}
        >
          {t('passenger.success.goToTravels')}
        </Button>
      );
    } catch (error) {
      console.error(error);
      addToast(t('passenger.errors.cant_select_travel'));
    }
  };

  return (
    <>
      {(availableTravels.length === 0 && (
        <Box>
          <Typography variant="h5">
            {t('passenger.creation.no_travel.title')}
          </Typography>
          <img src="/assets/car.png" />
          <Typography>
            {t('passenger.creation.no_travel.desc', {
              name: passenger?.attributes?.name,
            })}
          </Typography>
          <ShareEvent title={`Caroster ${name}`} />
        </Box>
      )) || (
        <div>
          <List disablePadding>
            {availableTravels.map(({id, attributes}, i) => {
              const travel = {id, ...attributes};
              const passengersCount = travel?.passengers?.data.length || 0;
              const counter = `${passengersCount} / ${travel?.seats || 0}`;
              return (
                <ListItem key={i}>
                  <Box>
                    <Box>
                      {travel.departure && (
                        <Typography variant="subtitle1">
                          {t('passenger.creation.departure')}
                          {moment(travel.departure).format('LLLL')}
                        </Typography>
                      )}
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href={getMapsLink(travel.meeting)}
                        onClick={e => e.preventDefault}
                      >
                        {travel.meeting}
                      </Link>
                    </Box>
                    <Box>
                      <Typography variant="h6">{travel.vehicleName}</Typography>
                      <Typography variant="body2">
                        {t('passenger.creation.seats', {seats: counter})}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => assign(travel)}
                  >
                    {t('passenger.creation.assign')}
                  </Button>
                </ListItem>
              );
            })}
          </List>
        </div>
      )}
    </>
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
