/* eslint-disable no-restricted-syntax */
import { useEffect } from 'react';

type Props = {
  [key in keyof WindowEventMap]?: EventListenerOrEventListenerObject;
};

const useGlobalDOMEvents = (props: Props) => {
  useEffect(() => {
    for (const [key, func] of Object.entries(props)) {
      window.addEventListener(key, func, false);
    }
    return () => {
      for (const [key, func] of Object.entries(props)) {
        window.removeEventListener(key, func, false);
      }
    };
  });
};

export default useGlobalDOMEvents;
