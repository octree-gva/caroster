import {MapContainer, TileLayer, ZoomControl, useMap} from 'react-leaflet';
import MapWrapper from './MapWrapper';

const position = [35.612139, 140.113375];

const Map = () => {
  return (
    <MapWrapper>
      <MapContainer
        center={position}
        zoom={13}
        style={{height: '100%', width: '100%'}}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
      </MapContainer>
    </MapWrapper>
  );
};

export default Map;
