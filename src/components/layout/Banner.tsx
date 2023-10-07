import React from "react";
import { styled } from "styled-components";
import Title from "./Title";
import PauseButton from "../misc/PauseButton";
import { useGameContext } from "../../providers";

const Banner: React.FC = () => {
  const { controls, status } = useGameContext();

  const playing = status === "playing";
  const paused = status === "paused";

  const displayPauseButton = playing || paused;

  const togglePause = () => {
    if (paused) {
      controls.play();
    } else {
      controls.pause();
    }
  };

  return (
    <Container>
      {displayPauseButton && (
        <PauseButton paused={paused} onClick={togglePause} />
      )}
      <Title />
      {displayPauseButton && (
        <PauseButton paused={paused} onClick={togglePause} />
      )}
    </Container>
  );
};

export default Banner;

const Container = styled.div`
  display: flex;
  padding: 16px;
`;
