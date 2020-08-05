import { useEffect, useRef } from 'react';

export const useInterval = (callback: Function, delay: number | null): void => {
  const savedCallback = useRef<Function>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = (): void => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return (): void => clearInterval(id);
    }
  }, [delay]);
};
