import { useEffect, useRef } from 'react';

export const useOutsideClick = callback => {
  const ref = useRef<any>(null);

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref };
};
