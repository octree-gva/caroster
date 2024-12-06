import {useMap} from 'react-leaflet';
import useMapStore from '../../stores/useMapStore';

const MapController = () => {
  const map = useMap();
  const setMap = useMapStore(s => s.setMap);
  const storedMap = useMapStore(s => s.map);
  map.scrollWheelZoom.disable();

  if (storedMap !== map) setMap(map);

  return <></>;
};

export default MapController;
