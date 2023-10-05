import {useMap} from 'react-leaflet';
import useMapStore from '../../stores/useMapStore';

const MapController = () => {
  const map = useMap();
  const {setMap, map: storedMap} = useMapStore();

  if (!storedMap) {
    setMap(map);
  }

  return <></>;
};

export default MapController;
