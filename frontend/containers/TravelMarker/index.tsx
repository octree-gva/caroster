import {useEffect, useRef} from 'react';
import {CircleMarker} from 'react-leaflet';
import {useTheme} from '@mui/material';
import useMapStore from '../../stores/useMapStore';
import TravelPopup from './TravelPopup';
import {TravelEntity} from '../../generated/graphql';

interface Props {
  travel: TravelEntity;
  focused: boolean;
}

const TravelMarker = ({travel, focused}: Props) => {
  const {meeting_longitude, meeting_latitude} = travel.attributes;
  const {setFocusOnTravel} = useMapStore();
  const markerRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    if (focused) markerRef.current?.openPopup();
    else markerRef.current?.closePopup();
  }, [focused]);

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
        click: onClick,
      }}
    >
      <TravelPopup travel={travel} />
    </CircleMarker>
  );
};

export default TravelMarker;
