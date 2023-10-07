import React from "react";
import Menu from "./Menu";
import Button from "./Button";
import { useGameContext } from "../../providers";

interface PauseMenuProps {
  onQuit: () => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({ onQuit }) => {
  const { controls } = useGameContext();

  return (
    <Menu title="Paused">
      <Button label="Resume" colour="green" onClick={controls.play} />
      <Button label="Quit" colour="grey" onClick={onQuit} />
    </Menu>
  );
};

export default PauseMenu;
