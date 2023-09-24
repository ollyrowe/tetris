import { useEffect, useCallback, useState, useRef } from "react";

export const useInterval = (callback: IntervalCallback, delay: number) => {
  const interval = useRef<number>();

  const [paused, setPaused] = useState(false);

  const handler = useCallback(
    () =>
      callback({
        stop: () => {
          setPaused(true);
          clearInterval(interval.current);
        },
      }),
    [callback]
  );

  const togglePause = () => {
    if (paused) {
      setPaused(false);
      interval.current = setInterval(handler, delay);
    } else {
      setPaused(true);
      clearInterval(interval.current);
    }
  };

  /**
   * Setup the interval.
   */
  useEffect(() => {
    clearInterval(interval.current);

    interval.current = setInterval(handler, delay);

    return () => clearInterval(interval.current);
  }, [handler, delay]);

  return { paused, togglePause };
};

export type IntervalCallback = (options: { stop: () => void }) => void;
