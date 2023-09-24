import React from "react";
import { styled } from "styled-components";
import Play from "../assets/play.svg?react";
import Pause from "../assets/pause.svg?react";

interface Props {
  paused: boolean;
  onClick: () => void;
}

const PauseButton: React.FC<Props> = ({ paused, onClick }) => {
  const onMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the button from stealing focus from the game container
    event.preventDefault();
  };

  return (
    <Button onClick={onClick} onMouseDown={onMouseDown}>
      {paused ? <PlayIcon /> : <PauseIcon />}
    </Button>
  );
};

export default PauseButton;

const Button = styled.button`
  display: flex;
  width: 40px;
  height: 40px;
  background-color: #3a3a3a;
  border: 4px solid #c1c1c1;
  border-radius: 8px;
  margin-top: auto;
  margin-bottom: auto;
  padding: 6px;
  box-shadow: 1px 1px 12px 0px black;
`;

const PlayIcon = styled(Play)`
  fill: white;
  width: 100%;
  height: 100%;
`;

const PauseIcon = styled(Pause)`
  fill: white;
  width: 100%;
  height: 100%;
`;
