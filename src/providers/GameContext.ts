import { createContext, useContext } from "react";
import { useGame } from "../hooks/useGame";

export const GameContext = createContext<ReturnType<typeof useGame>>({
  controls: {
    moveTetrimino: () => undefined,
    softDropTetrimino: () => undefined,
    hardDropTetrimino: () => undefined,
    cancelSoftDrop: () => undefined,
    rotateTetrimino: () => undefined,
    holdTetrimino: () => undefined,
    pause: () => undefined,
    play: () => undefined,
    start: () => undefined,
    quit: () => undefined,
  },
  heldTetrimino: undefined,
  queue: [],
  stats: {
    level: 1,
    lines: 0,
    points: 0,
  },
  tiles: [],
  highScores: [],
  status: "idle",
  startLevel: 1,
  setStartLevel: () => undefined,
});

export const useGameContext = () => useContext(GameContext);
