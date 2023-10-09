import React from "react";
import { styled } from "styled-components";
import Menu from "./Menu";
import Button from "./Button";
import { useCountdown } from "../../hooks/useCountdown";

interface PauseMenuProps {
  onPlay: () => void;
  onQuit: () => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({ onPlay, onQuit }) => {
  // Countdown from 3 seconds to be started when resuming the game
  const resumeCountdown = useCountdown(onPlay, 3, { interval: 750 });

  // Render a title when the countdown isn't active
  const title = !resumeCountdown.active ? "Paused" : undefined;

  return (
    <Menu title={title}>
      {resumeCountdown.active ? (
        <CountDown>{resumeCountdown.timeRemaining}</CountDown>
      ) : (
        <>
          <Button
            label="Resume"
            colour="green"
            onClick={resumeCountdown.start}
          />
          <Button label="Quit" colour="grey" onClick={onQuit} />
        </>
      )}
    </Menu>
  );
};

export default PauseMenu;

const CountDown = styled.div`
  font-size: 5rem;
  font-weight: bold;
`;
