import React from "react";
import Menu from "./Menu";
import Button from "./Button";
import { useGameContext } from "../../providers";

interface QuitMenuProps {
  onCancel: () => void;
}

const QuitMenu: React.FC<QuitMenuProps> = ({ onCancel }) => {
  const { controls } = useGameContext();

  return (
    <Menu title="Quit Game?">
      <Button label="Ok" colour="grey" onClick={controls.quit} />
      <Button label="Cancel" colour="grey" onClick={onCancel} />
    </Menu>
  );
};

export default QuitMenu;
