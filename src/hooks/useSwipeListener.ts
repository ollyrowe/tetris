import { useEffect, useCallback, useRef } from "react";
import { Direction } from "../types";

interface Options {
  threshold: { x: number; y: number };
}

export const useSwipeListener = (
  callback: (direction: Direction) => void,
  options: Options
) => {
  const touchStart = useRef({ x: 0, y: 0 });
  const touchEnd = useRef({ x: 0, y: 0 });

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.targetTouches[0];

    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const touch = e.targetTouches[0];

      touchEnd.current = { x: touch.clientX, y: touch.clientY };

      if (touchStart.current.x - touchEnd.current.x > options.threshold.x) {
        callback("left");

        touchStart.current = touchEnd.current;
      }

      if (touchEnd.current.x - touchStart.current.x > options.threshold.x) {
        callback("right");

        touchStart.current = touchEnd.current;
      }

      if (touchStart.current.y - touchEnd.current.y > options.threshold.y) {
        callback("up");

        touchStart.current = touchEnd.current;
      }

      if (touchEnd.current.y - touchStart.current.y > options.threshold.y) {
        callback("down");

        touchStart.current = touchEnd.current;
      }
    },
    [callback, options.threshold]
  );

  const handleTouchEnd = useCallback(() => {
    touchEnd.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);
};
