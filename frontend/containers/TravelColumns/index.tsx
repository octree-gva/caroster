import {useState} from 'react';
import dynamic from 'next/dynamic';
import Container from '@mui/material/Container';
import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@mui/material/styles';
import useEventStore from '../../stores/useEventStore';
import useToastStore from '../../stores/useToastStore';
import useMapStore from '../../stores/useMapStore';
import useProfile from '../../hooks/useProfile';
import useAddToEvents from '../../hooks/useAddToEvents';
import usePassengersActions from '../../hooks/usePassengersActions';
import Map from '../Map';
import Travel from '../Travel';
import NoCar from './NoCar';
import {TravelEntity} from '../../generated/graphql';
import {AddPassengerToTravel} from '../NewPassengerDialog';

const EventMarker = dynamic(() => import('../EventMarker'), {ssr: false});
const TravelMarker = dynamic(() => import('../TravelMarker'), {ssr: false});

interface Props {
  toggle: () => void;
}

const TravelColumns = (props: Props) => {
  const theme = useTheme();
  const {
    focusedTravel,
    preventUpdateKey,
    setPreventUpdateKey,
    setMarkers,
    setBounds,
  } = useMapStore();
  const event = useEventStore(s => s.event);
  const travels = event?.travels?.data || [];
  const {t} = useTranslation();
  const addToast = useToastStore(s => s.addToast);
  const {addToEvent} = useAddToEvents();
  const {profile, userId} = useProfile();

  const [selectedTravel, setSelectedTravel] = useState<TravelEntity>();
  const {addPassenger} = usePassengersActions();
  const sortedTravels = travels?.slice().sort(sortTravels);

  const addSelfToTravel = async (travel: TravelEntity) => {
    const hasName = profile.firstName && profile.lastName;
    const userName = profile.firstName + ' ' + profile.lastName;
    try {
      await addPassenger({
        user: userId,
        email: profile.email,
        name: hasName ? userName : profile.username,
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
  const showMap =
    (latitude && longitude) ||
    travels.some(
      ({attributes: {meeting_latitude, meeting_longitude}}) =>
        meeting_latitude && meeting_longitude
    );
  let coordsString = `${latitude}${longitude}`;

  const {markers, bounds} = travels.reduce(
    ({markers, bounds}, travel) => {
      const {
        attributes: {meeting_latitude, meeting_longitude},
      } = travel;
      if (meeting_latitude && meeting_longitude) {
        const travelObject = {id: travel.id, ...travel.attributes};
        coordsString =
          coordsString + String(meeting_latitude) + String(meeting_longitude);
        return {
          markers: [
            ...markers,
            <TravelMarker
              travel={travelObject}
              focused={focusedTravel === travel.id}
            />,
          ],
          bounds: [...bounds, [meeting_latitude, meeting_longitude]],
        };
      }
      return {markers, bounds};
    },
    {markers: [], bounds: []}
  );

  const mapUpdateKey = `${event.uuid}.travels+${coordsString}.${latitude}.${longitude}.${focusedTravel}`;
  if (preventUpdateKey !== mapUpdateKey) {
    setPreventUpdateKey(mapUpdateKey);
    if (latitude && longitude) {
      bounds.push([latitude, longitude]);
      markers.push(<EventMarker event={event} />);
    }
    if (!focusedTravel) {
      setBounds(bounds);
    }
    setMarkers(markers);
  }

  return (
    <>
      {showMap && <Map />}
      <Box
        p={0}
        pt={showMap ? 4 : 9}
        pb={11}
        sx={{
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: showMap ? '50vh' : '100vh',
          [theme.breakpoints.down('md')]: {
            maxHeight: showMap ? '50vh' : '100vh',
            px: 1,
          },
        }}
      >
        <Masonry columns={{xl: 4, lg: 3, md: 2, sm: 2, xs: 1}} spacing={0}>
          {sortedTravels?.map(travel => {
            return (
              <Container
                key={travel.id}
                maxWidth="sm"
                sx={{
                  p: 1,
                  mb: 10,
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
                  onAddSelf={() => addSelfToTravel(travel)}
                  onAddOther={() => setSelectedTravel(travel)}
                  {...props}
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
      {!!selectedTravel && (
        <AddPassengerToTravel
          open={!!selectedTravel}
          toggle={() => setSelectedTravel(null)}
          travel={selectedTravel}
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
