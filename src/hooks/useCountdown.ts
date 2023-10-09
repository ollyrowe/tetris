import { useState, useEffect } from "react";

/**
 * Hook which invokes a callback after a specified number of seconds.
 */
export const useCountdown = (
  callback: () => void,
  seconds: number,
  options: Options = { interval: 100 }
) => {
  // Whether the countdown is ongoing
  const [active, setActive] = useState(false);

  // The number of seconds remaining
  const [timeRemaining, setTimeRemaining] = useState(seconds);

  const start = () => {
    setActive(true);
  };

  useEffect(() => {
    if (active) {
      if (timeRemaining === 0) {
        setActive(false);
        callback();
      } else {
        const timeout = setTimeout(() => {
          setTimeRemaining(timeRemaining - 1);
        }, options.interval);

        return () => clearTimeout(timeout);
      }
    }
  }, [active, timeRemaining, callback, options.interval]);

  return { start, active, timeRemaining };
};

interface Options {
  /** The interval, in milliseconds, at which to update the countdown */
  interval: number;
}
