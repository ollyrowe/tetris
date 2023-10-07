import React from "react";
import Menu from "./Menu";
import Button from "./Button";

interface PauseMenuProps {
  onPlay: () => void;
  onQuit: () => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({ onPlay, onQuit }) => {
  return (
    <Menu title="Paused">
      <Button label="Resume" colour="green" onClick={onPlay} />
      <Button label="Quit" colour="grey" onClick={onQuit} />
    </Menu>
  );
};

export default PauseMenu;
