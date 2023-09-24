import React from "react";
import { styled } from "styled-components";
import Title from "./Title";
import PauseButton from "./PauseButton";

interface BannerProps {
  paused: boolean;
  pause: () => void;
  play: () => void;
}

const Banner: React.FC<BannerProps> = ({ paused, pause, play }) => {
  const togglePause = () => {
    if (paused) {
      play();
    } else {
      pause();
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
