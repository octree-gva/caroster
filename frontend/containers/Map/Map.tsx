import {
  MapContainer,
  CircleMarker,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import {useTheme} from '@mui/material';
import MapWrapper from './MapWrapper';
import useMapStore from '../../stores/useMapStore';

const Map = () => {
  const theme = useTheme();
  const {center, markers} = useMapStore();
  const defaultMarkerStyle = {
    radius: 9,
    fillColor: theme.palette.primary.main,
    fillOpacity: 1,
    color: theme.palette.background.paper,
    opacity: 1,
    weight: 3,
  };
  return (
    <MapWrapper>
      <MapContainer
        center={center}
        zoom={15}
        style={{height: '100%', width: '100%'}}
        zoomControl={false}
      >
        <TileLayer
          key="tiles"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl key="control_zoom" position="bottomright" />
        {markers.map((circleMarkerProps, index) => (
          <CircleMarker
            key={index}
            {...defaultMarkerStyle}
            {...circleMarkerProps}
          />
        ))}
      </MapContainer>
    </MapWrapper>
  );
};

export default Map;
