import {useMemo, useState} from 'react';
import dynamic from 'next/dynamic';
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
import MasonryContainer from './MasonryContainer';
import LoginToAttend from './LoginToAttend';
import usePermissions from '../../hooks/usePermissions';
import useDisplayTravels from './useDisplayTravels';
import FilterByDate from '../../components/FilterByDate';
import moment from 'moment';

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
  const {
    userPermissions: {canAddTravel},
  } = usePermissions();

  const [selectedTravel, setSelectedTravel] = useState<TravelEntity>();
  const {addPassenger} = usePassengersActions();
  const {selectedDates, setSelectedDates, displayedTravels} =
    useDisplayTravels();

  const buttonFilterContent = useMemo(() => {
    if (selectedDates.length > 1) return t('event.filter.dates');
    else if (selectedDates.length === 1)
      return selectedDates.map(date => date.format('dddd Do MMMM'));
    else return t('event.filter.allDates');
  }, [selectedDates, t]);

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
              key={travel.id}
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
      markers.push(<EventMarker key="event" event={event} />);
    }
    if (!focusedTravel) {
      setBounds(bounds);
    }
    setMarkers(markers);
  }

  const dates = Array.from(
    new Set(travels.map(travel => travel?.attributes?.departure))
  )
    .map(date => moment(date))
    .filter(date => date.isValid())
    .sort((a, b) => (a.isAfter(b) ? 1 : -1));

  return (
    <>
      {showMap && <Map />}
      <FilterByDate
        dates={dates}
        setSelectedDates={setSelectedDates}
        buttonFilterContent={buttonFilterContent}
      />
      <Box
        p={0}
        pt={showMap ? 4 : 13}
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
          {!canAddTravel() && (
            <MasonryContainer key="no_other_travel">
              <LoginToAttend />
            </MasonryContainer>
          )}
          {displayedTravels?.map(travel => {
            return (
              <MasonryContainer key={travel.id}>
                <Travel
                  travel={travel}
                  onAddSelf={() => addSelfToTravel(travel)}
                  onAddOther={() => setSelectedTravel(travel)}
                  {...props}
                />
              </MasonryContainer>
            );
          })}
          <MasonryContainer key="no_other_travel">
            <NoCar
              eventName={event?.name}
              title={t('event.no_other_travel.title')}
            />
          </MasonryContainer>
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

export default TravelColumns;
