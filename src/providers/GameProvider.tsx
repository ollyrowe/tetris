import React from "react";
import { GameContext } from "./GameContext";
import { useGame } from "../hooks/useGame";

interface Props {
  children: React.ReactNode;
}

const GameProvider: React.FC<Props> = ({ children }) => {
  const game = useGame();

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};

export default GameProvider;
