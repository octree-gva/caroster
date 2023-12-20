import {MapContainer, TileLayer} from 'react-leaflet';
import MapController from './MapController';
import MapWrapper from './MapWrapper';
import useMapStore from '../../stores/useMapStore';
import Bounds from './Bounds';

const DEV_TILES_URL =
  process.env.DEV_TILES_URL ||
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const Map = () => {
  const {markers} = useMapStore();

  return (
    <MapWrapper>
      <MapContainer
        style={{height: '100%', width: '100%'}}
        zoomControl={false}
      >
        <Bounds />
        <TileLayer key="tiles" url={DEV_TILES_URL} />
        <MapController />
        {markers}
      </MapContainer>
    </MapWrapper>
  );
};

export default Map;
