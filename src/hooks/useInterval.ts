import { useEffect, useCallback, useMemo, useState, useRef } from "react";

export const useInterval = (callback: IntervalCallback, delay: number) => {
  const interval = useRef<number>();

  const [paused, setPaused] = useState(true);

  const pause = useCallback(() => setPaused(true), []);

  const handler = useCallback(() => callback({ pause }), [callback, pause]);

  const play = useCallback(
    ({ immediate = false } = {}) => {
      if (immediate) {
        handler();
      }

      setPaused(false);
    },
    [handler]
  );

  useEffect(() => {
    clearInterval(interval.current);

    if (!paused) {
      interval.current = setInterval(handler, delay);
    }

    return () => clearInterval(interval.current);
  }, [paused, handler, delay]);

  return useMemo(() => ({ paused, pause, play }), [paused, pause, play]);
};

export type IntervalCallback = (options: { pause: () => void }) => void;
