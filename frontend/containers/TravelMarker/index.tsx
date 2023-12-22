import {useRef} from 'react';
import {CircleMarker} from 'react-leaflet';
import {useTheme} from '@mui/material';
import useMapStore from '../../stores/useMapStore';
import TravelPopup from './TravelPopup';
import {Travel} from '../../generated/graphql';

interface Props {
  travel: Travel & {id: string};
  focused: boolean;
}

const TravelMarker = ({travel, focused}: Props) => {
  const {meeting_longitude, meeting_latitude} = travel;
  const {setFocusOnTravel} = useMapStore();
  const markerRef = useRef(null);
  const theme = useTheme();
  const marker = markerRef.current;

  if (marker && focused) {
    marker.openPopup();
  }

  const markerStyle = {
    radius: 12,
    fillColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
    fillOpacity: 1,
    opacity: 1,
    weight: 3,
  };

  const onClick = () => {
    setFocusOnTravel(travel);
    const travelCard = document?.getElementById(travel.id);
    travelCard?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <CircleMarker
      ref={markerRef}
      {...markerStyle}
      center={[meeting_latitude, meeting_longitude]}
      eventHandlers={{
        click: onClick
      }}
    >
      <TravelPopup travel={travel} />
    </CircleMarker>
  );
};

export default TravelMarker;
