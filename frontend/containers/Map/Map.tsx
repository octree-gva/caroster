import {
  MapContainer,
  CircleMarker,
  TileLayer,
  ZoomControl,
  Popup,
} from 'react-leaflet';
import {useTheme} from '@mui/material';
import MapController from './MapController';
import MapWrapper from './MapWrapper';
import useMapStore from '../../stores/useMapStore';
import Bounds from './Bounds';

const DEV_TILES_URL =
  process.env.DEV_TILES_URL ||
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const Map = () => {
  const theme = useTheme();
  const {center, markers} = useMapStore();
  const defaultMarkerStyle = {
    radius: 12,
    fillColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
    fillOpacity: 1,
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
        <Bounds />
        <TileLayer key="tiles" url={DEV_TILES_URL} />
        <MapController />
        {markers.map(({popup, ...circleMarkerProps}, index) => (
          <CircleMarker
            key={index}
            {...defaultMarkerStyle}
            radius={circleMarkerProps.double ? 9 : defaultMarkerStyle.radius}
            center={circleMarkerProps.center}
          >
            <CircleMarker
              {...{
                ...defaultMarkerStyle,
                fillColor: defaultMarkerStyle.color,
                color: defaultMarkerStyle.fillColor,
              }}
              center={circleMarkerProps.center}
            ></CircleMarker>
            {popup && <Popup>{popup}</Popup>}
          </CircleMarker>
        ))}
      </MapContainer>
    </MapWrapper>
  );
};

export default Map;
