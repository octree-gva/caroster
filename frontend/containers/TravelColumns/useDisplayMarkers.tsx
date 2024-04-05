import moment, {Moment} from 'moment';
import {useEffect, useMemo} from 'react';
import useMapStore from '../../stores/useMapStore';
import dynamic from 'next/dynamic';
import {Event} from '../../generated/graphql';

const EventMarker = dynamic(() => import('../EventMarker'), {ssr: false});
const TravelMarker = dynamic(() => import('../TravelMarker'), {ssr: false});

interface Props {
  event: Event & {id: string};
  selectedDates: Moment[];
}

const useDisplayMarkers = ({event, selectedDates}: Props) => {
  const setMarkers = useMapStore(s => s.setMarkers);
  const setBounds = useMapStore(s => s.setBounds);
  const focusedTravel = useMapStore(s => s.focusedTravel);

  const travelsWithGeoloc = useMemo(() => {
    const travels = event?.travels.data || [];
    const filteredTravels =
      selectedDates.length >= 1
        ? travels.filter(travel => {
            const departureDate = moment(travel?.attributes?.departure);
            return selectedDates.some(date =>
              date.isSame(departureDate, 'day')
            );
          })
        : travels;

    return filteredTravels.filter(
      travel =>
        travel.attributes.meeting_latitude &&
        travel.attributes.meeting_longitude
    );
  }, [event, selectedDates]);

  // Set markers
  useEffect(() => {
    let markers = [];

    // Set event marker
    const {latitude, longitude} = event || {};
    if (latitude && longitude)
      markers.push(<EventMarker key="event" event={event} />);

    // Set travels markers
    const travelMarkers = travelsWithGeoloc.map(travel => (
      <TravelMarker
        key={travel.id}
        travel={travel}
        focused={focusedTravel === travel.id}
      />
    ));
    markers.push(...travelMarkers);

    setMarkers(markers);
  }, [event, travelsWithGeoloc, focusedTravel, setMarkers]);

  // Set bounds
  useEffect(() => {
    let bounds = [];

    // Set event bounds
    const {latitude, longitude} = event || {};
    if (latitude && longitude) bounds.push([latitude, longitude]);

    // Set travels bounds
    const travelCoords = travelsWithGeoloc.map(travel => [
      travel.attributes.meeting_latitude,
      travel.attributes.meeting_longitude,
    ]);
    bounds.push(...travelCoords);

    setBounds(bounds);
  }, [event, travelsWithGeoloc, setBounds]);
};

export default useDisplayMarkers;
