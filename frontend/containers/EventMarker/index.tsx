import {CircleMarker} from 'react-leaflet';
import {useTheme} from '@mui/material';
import EventPopup from './EventPopup';
import {Event} from '../../generated/graphql';

interface Props {
  event: Event & {id: string};
}

const EventMarker = ({event}: Props) => {
  const {latitude, longitude} = event;
  const theme = useTheme();

  const markerStyle = {
    radius: 12,
    fillColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
    fillOpacity: 1,
    opacity: 1,
    weight: 3,
  };

  return (
    <CircleMarker {...markerStyle} radius={9} center={[latitude, longitude]}>
      <CircleMarker
        {...{
          ...markerStyle,
          fillColor: markerStyle.color,
          color: markerStyle.fillColor,
        }}
        center={[latitude, longitude]}
      ></CircleMarker>
      <EventPopup event={event} />
    </CircleMarker>
  );
};

export default EventMarker;
