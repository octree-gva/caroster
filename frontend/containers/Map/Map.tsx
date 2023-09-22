import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import MapWrapper from './MapWrapper';

const position = [51.505, -0.09];

const Map = () => {
  return (
    <MapWrapper>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{height: '100%', width: '100%'}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </MapWrapper>
  );
};

export default Map;
