import { useEffect, useRef } from "react";

export const useInterval = (callback: IntervalCallback, delay: number) => {
  const stopped = useRef(false);

  useEffect(() => {
    if (!stopped.current) {
      const interval = setInterval(
        () =>
          callback({
            stop: () => {
              stopped.current = true;
              clearInterval(interval);
            },
          }),
        delay
      );

      return () => clearInterval(interval);
    }
  }, [callback, delay]);
};

export type IntervalCallback = (options: { stop: () => void }) => void;
