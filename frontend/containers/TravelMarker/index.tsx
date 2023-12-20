import {CircleMarker} from 'react-leaflet';
import {useTheme} from '@mui/material';
import TravelPopup from './TravelPopup';
import {Travel} from '../../generated/graphql';
import {useRef, useState} from 'react';

interface Props {
  travel: Travel & {id: string};
  focused: boolean;
}

const TravelMarker = ({travel, focused}: Props) => {
  const {meeting_longitude, meeting_latitude} = travel;
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

  return (
    <CircleMarker
      ref={markerRef}
      {...markerStyle}
      center={[meeting_latitude, meeting_longitude]}
    >
      <TravelPopup travel={travel} />
    </CircleMarker>
  );
};

export default TravelMarker;
