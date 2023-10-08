import React from "react";
import { styled } from "styled-components";
import Title from "./Title";
import PauseButton from "../misc/PauseButton";
import { useGameContext } from "../../providers";

const Banner: React.FC = () => {
  const { controls, status } = useGameContext();

  const displayPauseButton = status === "playing" || status === "paused";

  return (
    <Container>
      {displayPauseButton && <PauseButton onClick={controls.pause} />}
      <Title />
      {displayPauseButton && <PauseButton onClick={controls.pause} />}
    </Container>
  );
};

export default Banner;

const Container = styled.div`
  display: flex;
  padding: 16px;
`;
