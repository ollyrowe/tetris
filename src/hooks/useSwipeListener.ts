import { useEffect, useCallback, useRef } from "react";
import { Direction } from "../types";

interface Options {
  threshold: number;
}

export const useSwipeListener = (
  target: HTMLElement | null,
  callback: (event: SwipeEvent) => void,
  options: Options
) => {
  // The position of the initial touch event
  const initialTouch = useRef<Position>({ x: 0, y: 0 });
  // The position of the previous touch event
  const previousTouch = useRef<Position>({ x: 0, y: 0 });
  // The position of the latest touch event
  const latestTouch = useRef<Position>({ x: 0, y: 0 });

  // The time in which the initial touch event occurred
  const touchInitialTime = useRef(0);

  const getSwipeDirection = useCallback(
    (start: Position, end: Position) => {
      const xDelta = Math.abs(start.x - end.x);
      const yDelta = Math.abs(start.y - end.y);

      // Only consider the axis that has the largest delta
      if (xDelta > yDelta) {
        if (start.x - end.x > options.threshold) {
          return "left";
        }

        if (end.x - start.x > options.threshold) {
          return "right";
        }
      } else {
        if (start.y - end.y > options.threshold) {
          return "up";
        }

        if (end.y - start.y > options.threshold) {
          return "down";
        }
      }
    },
    [options]
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.targetTouches[0];

    const position = { x: touch.clientX, y: touch.clientY };

    initialTouch.current = position;
    previousTouch.current = position;
    latestTouch.current = position;

    touchInitialTime.current = new Date().getTime();
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const touch = e.targetTouches[0];

      latestTouch.current = { x: touch.clientX, y: touch.clientY };

      const direction = getSwipeDirection(
        previousTouch.current,
        latestTouch.current
      );

      if (direction) {
        callback({ type: "move", direction });

        previousTouch.current = latestTouch.current;
      }
    },
    [callback, getSwipeDirection]
  );

  const handleTouchEnd = useCallback(() => {
    const direction = getSwipeDirection(
      initialTouch.current,
      latestTouch.current
    );

    if (direction) {
      const currentTime = new Date().getTime();

      const duration = currentTime - touchInitialTime.current;

      callback({ type: "end", direction, duration });
    }
  }, [callback, getSwipeDirection]);

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

type Position = { x: number; y: number };

type BaseSwipeEvent<T, S = object> = { type: T; direction: Direction } & S;

type SwipeMoveEvent = BaseSwipeEvent<"move">;

type SwipeEndEvent = BaseSwipeEvent<"end", { duration: number }>;

export type SwipeEvent = SwipeMoveEvent | SwipeEndEvent;
