import { useEffect, useCallback, useState, useRef } from "react";

export const useInterval = (callback: IntervalCallback, delay: number) => {
  const interval = useRef<number>();

  const [paused, setPaused] = useState(true);

  const pause = useCallback(() => setPaused(true), []);

  const play = useCallback(() => setPaused(false), []);

  const handler = useCallback(() => callback({ pause }), [callback, pause]);

  useEffect(() => {
    clearInterval(interval.current);

    if (!paused) {
      interval.current = setInterval(handler, delay);
    }

    return () => clearInterval(interval.current);
  }, [paused, handler, delay]);

  return { paused, pause, play };
};

export type IntervalCallback = (options: { pause: () => void }) => void;
