import {useEffect, useMemo} from 'react';
import {useMap} from 'react-leaflet';
import useDebounce from '../../hooks/useDebounce';
import useMapStore from '../../stores/useMapStore';

const Bounds = () => {
  const map = useMap();
  const {bounds: storedBounds} = useMapStore();
  const debouncedBounds = useDebounce(storedBounds, 750);
  const bounds = useMemo(
    () => debouncedBounds.map(bound => bound),
    [debouncedBounds]
  );

  useEffect(() => {
    if (bounds.length >= 1) {
      map.fitBounds(bounds, {padding: [30, 30]});
    }
  }, [bounds]);

  return null;
};

export default Bounds;
