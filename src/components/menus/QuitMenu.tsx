import React from "react";
import Menu from "./Menu";
import Button from "./Button";

interface QuitMenuProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const QuitMenu: React.FC<QuitMenuProps> = ({ onConfirm, onCancel }) => {
  return (
    <Menu title="Quit Game?">
      <Button label="Ok" colour="grey" onClick={onConfirm} />
      <Button label="Cancel" colour="grey" onClick={onCancel} />
    </Menu>
  );
};

export default QuitMenu;
