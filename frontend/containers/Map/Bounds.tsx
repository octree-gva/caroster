import {useEffect, useMemo} from 'react';
import {useMap} from 'react-leaflet';
import useDebounce from '../../hooks/useDebounce';
import useMapStore from '../../stores/useMapStore';

const Bounds = () => {
  const map = useMap();
  const storedBounds = useMapStore(s => s.bounds);
  const bounds = useDebounce(storedBounds, 750);

  useEffect(() => {
    if (bounds.length >= 1) {
      map.fitBounds(bounds, {padding: [30, 30]});
    }
  }, [bounds, map]);

  return null;
};

export default Bounds;
