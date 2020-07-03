import {useState, useEffect} from 'react';

// https://github.com/xnimorz/use-debounce
/**
 *
 * @param {*} value Value to debounce
 * @param {number} delay Debounce time
 * @return {*}
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
