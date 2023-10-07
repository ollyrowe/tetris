import { useState, useEffect } from "react";

/**
 * Hook which invokes a callback after a specified number of seconds.
 */
export const useCountdown = (callback: () => void, seconds: number) => {
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
        }, 1000);

        return () => clearTimeout(timeout);
      }
    }
  }, [active, timeRemaining, callback]);

  return { start, active, timeRemaining };
};
