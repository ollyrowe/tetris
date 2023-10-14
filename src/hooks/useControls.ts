import { useCallback, useRef } from "react";
import { useKeydownListener } from "./useKeyboardListener";
import { SwipeEvent, useSwipeListener } from "./useSwipeListener";
import { MoveableDirection } from "../types";
import { useClickListener } from "./useClickListener";
import { usePageBlurListener } from "./usePageBlurListener";

interface Controls {
  moveTetrimino: (direction: MoveableDirection) => void;
  softDropTetrimino: () => void;
  hardDropTetrimino: () => void;
  cancelSoftDrop: () => void;
  rotateTetrimino: () => void;
  holdTetrimino: () => void;
  pause: () => void;
}

export const useControls = (controls: Controls) => {
  // The ref to be bound to the DOM element that will receive the event listeners
  const ref = useRef<HTMLDivElement>(null);

  const {
    moveTetrimino,
    softDropTetrimino,
    hardDropTetrimino,
    cancelSoftDrop,
    rotateTetrimino,
    holdTetrimino,
    pause,
  } = controls;

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
    (event: SwipeEvent) => {
      switch (event.direction) {
        case "down":
          if (event.type === "end" && event.duration < 300) {
            return hardDropTetrimino();
          }

          if (event.type === "end") {
            return cancelSoftDrop();
          }

          return softDropTetrimino();
        case "up":
          if (event.type === "end") {
            holdTetrimino();
          }

          return cancelSoftDrop();
        default:
          if (event.type === "move") {
            moveTetrimino(event.direction);
          }

          break;
      }
    },
    [
      softDropTetrimino,
      hardDropTetrimino,
      cancelSoftDrop,
      holdTetrimino,
      moveTetrimino,
    ]
  );

  useSwipeListener(ref.current, handleSwipe, { threshold: 20 });

  useClickListener(ref.current, rotateTetrimino);

  usePageBlurListener(pause);

  return ref;
};
