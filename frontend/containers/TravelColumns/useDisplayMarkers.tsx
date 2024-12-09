import moment from 'moment';
import {useEffect, useMemo} from 'react';
import useMapStore from '../../stores/useMapStore';
import dynamic from 'next/dynamic';
import {Event} from '../../generated/graphql';
import useTravelsStore from '../../stores/useTravelsStore';
import {calculateHaversineDistance} from '../../lib/geography';

const EventMarker = dynamic(() => import('../Markers/EventMarker'), {
  ssr: false,
});
const TravelMarker = dynamic(() => import('../Markers/TravelMarker'), {
  ssr: false,
});
const MeetingFilterMarker = dynamic(
  () => import('../Markers/MeetingFilterMarker'),
  {ssr: false}
);

interface Props {
  event: Event & {id: string};
}

const useDisplayMarkers = ({event}: Props) => {
  const setMarkers = useMapStore(s => s.setMarkers);
  const setBounds = useMapStore(s => s.setBounds);
  const focusedTravel = useMapStore(s => s.focusedTravel);
  const datesFilters = useTravelsStore(s => s.datesFilter);
  const meetingFilter = useTravelsStore(s => s.meetingFilter);

  const travelsWithGeoloc = useMemo(() => {
    const travels = event?.travels?.data || [];
    const filteredTravels =
      datesFilters.length >= 1
        ? travels.filter(travel => {
            const departureDate = moment(travel?.attributes?.departureDate);
            return datesFilters.some(date => date.isSame(departureDate, 'day'));
          })
        : travels;

    return filteredTravels.filter(
      travel =>
        travel.attributes.meeting_latitude &&
        travel.attributes.meeting_longitude
    );
  }, [event, datesFilters]);

  // Set markers
  useEffect(() => {
    let markers = [];

    // Set event marker
    const {latitude, longitude} = event || {};
    if (latitude && longitude)
      markers.push(<EventMarker key="event" event={event} />);

    // Set meeting filter marker
    if (meetingFilter?.latitude && meetingFilter?.longitude)
      markers.push(
        <MeetingFilterMarker
          center={[meetingFilter.latitude, meetingFilter.longitude]}
        />
      );

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
  }, [event, travelsWithGeoloc, focusedTravel, setMarkers, meetingFilter]);

  // Set bounds
  useEffect(() => {
    let bounds = [];

    if (meetingFilter?.latitude && meetingFilter?.longitude) {
      bounds.push([meetingFilter.latitude, meetingFilter.longitude]);

      // Set travels bounds
      const travelCoords = travelsWithGeoloc
        .map(travel => ({
          ...travel,
          distance: calculateHaversineDistance(
            [meetingFilter.latitude, meetingFilter.longitude],
            [
              travel.attributes.meeting_latitude,
              travel.attributes.meeting_longitude,
            ]
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3)
        .map(travel => [
          travel.attributes.meeting_latitude,
          travel.attributes.meeting_longitude,
        ]);
      bounds.push(...travelCoords);
    } else {
      // Set event bounds
      const {latitude, longitude} = event || {};
      if (latitude && longitude) bounds.push([latitude, longitude]);
      // Set travels bounds
      const travelCoords = travelsWithGeoloc.map(travel => [
        travel.attributes.meeting_latitude,
        travel.attributes.meeting_longitude,
      ]);
      bounds.push(...travelCoords);
    }

    setBounds(bounds);
  }, [event, travelsWithGeoloc, setBounds, meetingFilter]);
};

export default useDisplayMarkers;
