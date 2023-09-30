import { createContext, useContext } from "react";
import { useGame } from "../hooks/useGame";

export const GameContext = createContext<ReturnType<typeof useGame>>({
  controls: {
    play: () => undefined,
    pause: () => undefined,
    moveTetrimino: () => undefined,
    holdTetrimino: () => undefined,
    rotateTetrimino: () => undefined,
  },
  heldTetrimino: undefined,
  queue: [],
  stats: {
    level: 1,
    lines: 0,
    points: 0,
  },
  tiles: [],
  over: false,
  paused: false,
});

export const useGameContext = () => useContext(GameContext);
