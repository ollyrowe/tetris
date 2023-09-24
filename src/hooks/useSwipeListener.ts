import { useEffect, useCallback, useRef } from "react";
import { Direction } from "../types";

interface Options {
  threshold: { [direction in Direction]: number };
}

export const useSwipeListener = (
  target: HTMLElement | null,
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

      if (touchStart.current.x - touchEnd.current.x > options.threshold.left) {
        callback("left");

        touchStart.current = touchEnd.current;
      }

      if (touchEnd.current.x - touchStart.current.x > options.threshold.right) {
        callback("right");

        touchStart.current = touchEnd.current;
      }

      if (touchStart.current.y - touchEnd.current.y > options.threshold.up) {
        callback("up");

        touchStart.current = touchEnd.current;
      }

      if (touchEnd.current.y - touchStart.current.y > options.threshold.down) {
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
    if (target !== null) {
      target.addEventListener("touchstart", handleTouchStart);
      target.addEventListener("touchmove", handleTouchMove);
      target.addEventListener("touchend", handleTouchEnd);

      return () => {
        target.removeEventListener("touchstart", handleTouchStart);
        target.removeEventListener("touchmove", handleTouchMove);
        target.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [target, handleTouchStart, handleTouchMove, handleTouchEnd]);
};
