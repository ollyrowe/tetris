import { useCallback } from "react";
import { useKeydownListener } from "./useKeyboardListener";
import { useSwipeListener } from "./useSwipeListener";
import { Direction, MoveableDirection } from "../types";
import { useClickListener } from "./useClickListener";

interface Controls {
  moveTetrimino: (direction: MoveableDirection) => void;
  rotateTetrimino: () => void;
  holdTetrimino: () => void;
}

export const useControls = (controls: Controls) => {
  const { moveTetrimino, rotateTetrimino, holdTetrimino } = controls;

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
      }
    },
    [moveTetrimino, rotateTetrimino, holdTetrimino]
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

  useSwipeListener(handleSwipe, {
    threshold: { left: 20, right: 20, up: 80, down: 5 },
  });

  useClickListener(rotateTetrimino);
};
