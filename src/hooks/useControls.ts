import { useCallback, useRef } from "react";
import { useKeydownListener } from "./useKeyboardListener";
import { useSwipeListener } from "./useSwipeListener";
import { Direction, MoveableDirection } from "../types";
import { useClickListener } from "./useClickListener";
import { usePageBlurListener } from "./usePageBlurListener";

interface Controls {
  moveTetrimino: (direction: MoveableDirection) => void;
  rotateTetrimino: () => void;
  holdTetrimino: () => void;
  pause: () => void;
}

export const useControls = (controls: Controls) => {
  // The ref to be bound to the DOM element that will receive the event listeners
  const ref = useRef<HTMLDivElement>(null);

  const { moveTetrimino, rotateTetrimino, holdTetrimino, pause } = controls;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.code) {
        case "ArrowLeft":
          moveTetrimino("left");
          break;
        case "ArrowRight":
          moveTetrimino("right");
          break;
        case "ArrowDown":
          moveTetrimino("down");
          break;
        case "Space":
          rotateTetrimino();
          break;
        case "KeyH":
          holdTetrimino();
          break;
        case "Escape":
          pause();
          break;
      }
    },
    [moveTetrimino, rotateTetrimino, holdTetrimino, pause]
  );

  useKeydownListener(handleKeyDown);

  const handleSwipe = useCallback(
    (direction: Direction) => {
      if (direction === "up") {
        holdTetrimino();
      } else {
        moveTetrimino(direction);
      }
    },
    [holdTetrimino, moveTetrimino]
  );

  useSwipeListener(ref.current, handleSwipe, {
    threshold: { left: 20, right: 20, up: 80, down: 5 },
  });

  useClickListener(ref.current, rotateTetrimino);

  usePageBlurListener(pause);

  return ref;
};
