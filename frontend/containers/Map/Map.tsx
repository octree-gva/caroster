import {MapContainer, TileLayer} from 'react-leaflet';
import MapController from './MapController';
import MapWrapper from './MapWrapper';
import useMapStore from '../../stores/useMapStore';
import Bounds from './Bounds';
import MapActions from './MapActions';

const TOKEN_FREE_TILES_URL =
  process.env.TOKEN_FREE_TILES_URL ||
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const TOKEN_FREE_TILES_LAYER_ATTRIBUTION =
  process.env.TOKEN_FREE_TILES_LAYER_ATTRIBUTION ||
  '© <a target="_blank" href="https://www.openstreetmap.org/copyright/en">OpenStreetMap</a> contributors';

const Map = () => {
  const markers = useMapStore(s => s.markers);

  return (
    <MapWrapper>
      <MapContainer style={{height: '100%', width: '100%'}} zoomControl={false}>
        <Bounds />
        <TileLayer
          key="tiles"
          url={TOKEN_FREE_TILES_URL}
          attribution={TOKEN_FREE_TILES_LAYER_ATTRIBUTION}
        />
        <MapController />
        {markers}
        <MapActions />
      </MapContainer>
    </MapWrapper>
  );
};

export default Map;
