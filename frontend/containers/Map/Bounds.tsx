import {useEffect, useMemo} from 'react';
import {useMap} from 'react-leaflet';
import useDebounce from '../../hooks/useDebounce';
import useMapStore from '../../stores/useMapStore';

const Bounds = () => {
  const map = useMap();
  const {markers} = useMapStore();
  const debouncedMarkers = useDebounce(markers, 750);
  const bounds = useMemo(
    () => debouncedMarkers.map(marker => marker.center),
    [debouncedMarkers]
  );

  useEffect(() => {
    map.fitBounds(bounds, {padding: [30, 30]});
  }, [bounds]);

  return null;
};

export default Bounds;
