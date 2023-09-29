import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@mui/material/styles';
import Container from '@mui/material/Container';
import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';
import useEventStore from '../../stores/useEventStore';
import useToastStore from '../../stores/useToastStore';
import useMapStore from '../../stores/useMapStore';
import useProfile from '../../hooks/useProfile';
import useAddToEvents from '../../hooks/useAddToEvents';
import usePassengersActions from '../../hooks/usePassengersActions';
import Map from '../Map';
import Travel from '../Travel';
import NoCar from './NoCar';
import {Travel as TravelData, TravelEntity} from '../../generated/graphql';
import {AddPassengerToTravel} from '../NewPassengerDialog';

type TravelType = TravelData & {id: string};

interface Props {
  toggle: () => void;
}

const TravelColumns = (props: Props) => {
  const theme = useTheme();
  const {preventUpdateKey, setPreventUpdateKey, setCenter, setMarkers} =
    useMapStore();
  const event = useEventStore(s => s.event);
  const travels = event?.travels?.data || [];
  const {t} = useTranslation();
  const addToast = useToastStore(s => s.addToast);
  const {addToEvent} = useAddToEvents();
  const {profile, userId} = useProfile();

  const [newPassengerTravelContext, toggleNewPassengerToTravel] = useState<{
    travel: TravelType;
  } | null>(null);
  const {addPassenger} = usePassengersActions();
  const sortedTravels = travels?.slice().sort(sortTravels);

  const addSelfToTravel = async (travel: TravelType) => {
    try {
      await addPassenger({
        user: userId,
        email: profile.email,
        name: profile.username,
        travel: travel.id,
        event: event.id,
      });
      addToEvent(event.id);
      addToast(t('passenger.success.added_self_to_car'));
    } catch (error) {
      console.error(error);
    }
  };

  if (!event || travels?.length === 0)
    return (
      <NoCar
        showImage
        eventName={event?.name}
        title={t('event.no_travel.title')}
      />
    );

  const {latitude, longitude} = event;
  const showMap = latitude && longitude;
  const markers = [];
  travels.forEach(travel => {
    console.log(travel);
    const {
      attributes: {meeting_latitude, meeting_longitude},
    } = travel;
    if (meeting_latitude && meeting_longitude) {
      markers.push({center: [meeting_latitude, meeting_longitude]});
    }
  });

  const mapUpdateKey = `${event.uuid}.travels`;
  if (preventUpdateKey !== mapUpdateKey) {
    setPreventUpdateKey(mapUpdateKey);
    setCenter([latitude, longitude]);
    setMarkers([
      {
        center: [latitude, longitude],
        fillColor: theme.palette.secondary.main,
      },
      ...markers,
    ]);
  }

  return (
    <>
      {showMap && <Map />}
      <Box pt={showMap ? 2 : 9}>
        <Masonry columns={{xl: 4, lg: 3, md: 2, sm: 2, xs: 1}} spacing={0}>
          {sortedTravels?.map(({id, attributes}) => {
            const travel = {id, ...attributes};
            return (
              <Container
                key={travel.id}
                maxWidth="sm"
                sx={{
                  padding: theme.spacing(1),
                  marginBottom: theme.spacing(10),
                  outline: 'none',
                  '& > *': {
                    cursor: 'default',
                  },

                  [theme.breakpoints.down('md')]: {
                    marginBottom: `calc(${theme.spacing(10)} + 56px)`,
                  },
                }}
              >
                <Travel
                  travel={travel}
                  {...props}
                  getAddPassengerFunction={(addSelf: boolean) => () =>
                    addSelf
                      ? addSelfToTravel(travel)
                      : toggleNewPassengerToTravel({travel})}
                />
              </Container>
            );
          })}
          <Container
            maxWidth="sm"
            sx={{
              padding: theme.spacing(1),
              marginBottom: theme.spacing(10),
              outline: 'none',
              '& > *': {
                cursor: 'default',
              },

              [theme.breakpoints.down('md')]: {
                marginBottom: `calc(${theme.spacing(10)} + 56px)`,
              },
            }}
          >
            <NoCar
              eventName={event?.name}
              title={t('event.no_other_travel.title')}
            />
          </Container>
        </Masonry>
      </Box>
      {!!newPassengerTravelContext && (
        <AddPassengerToTravel
          open={!!newPassengerTravelContext}
          toggle={() => toggleNewPassengerToTravel(null)}
          travel={newPassengerTravelContext.travel}
        />
      )}
    </>
  );
};

const sortTravels = (
  {attributes: a}: TravelEntity,
  {attributes: b}: TravelEntity
) => {
  if (!b) return 1;
  const dateA = new Date(a.departure).getTime();
  const dateB = new Date(b.departure).getTime();
  if (dateA === dateB)
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  else return dateA - dateB;
};

export default TravelColumns;
