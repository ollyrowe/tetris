import React from "react";
import { styled } from "styled-components";
import Title from "./Title";
import PauseButton from "../misc/PauseButton";
import { useGameContext } from "../../providers";

const Banner: React.FC = () => {
  const { controls, paused } = useGameContext();

  const togglePause = () => {
    if (paused) {
      controls.play();
    } else {
      controls.pause();
    }
  };

  return (
    <Container>
      <PauseButton paused={paused} onClick={togglePause} />
      <Title />
      <PauseButton paused={paused} onClick={togglePause} />
    </Container>
  );
};

export default Banner;

const Container = styled.div`
  display: flex;
  padding: 16px;
`;
