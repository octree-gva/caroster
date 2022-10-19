import {useRef, useState} from 'react';
import useEventListener from './useEventListener';

const useMinimizedFab = () => {
  const [isFabMinimized, setIsFabMinimized] = useState(false);
  const element = useRef(
    typeof document !== 'undefined'
      ? document.getElementById('event-content')
      : null
  );

  useEventListener(
    'scroll',
    event => {
      if (typeof document != 'undefined') {
        const positionFromTop = event.target.scrollTop;
        const positionFromBottom =
          event.target.scrollHeight -
          event.target.offsetHeight -
          event.target.scrollTop;

        if (
          (positionFromTop < 20 || positionFromBottom < 20) &&
          isFabMinimized
        ) {
          setIsFabMinimized(false);
        } else if (
          !isFabMinimized &&
          positionFromTop > 20 &&
          positionFromBottom > 20
        ) {
          setIsFabMinimized(true);
        }
      }
    },
    element
  );

  return isFabMinimized;
};

export default useMinimizedFab;
