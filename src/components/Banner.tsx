import React from "react";
import { styled } from "styled-components";
import Title from "./Title";
import PauseButton from "./PauseButton";

interface BannerProps {
  paused: boolean;
  onTogglePause: () => void;
}

const Banner: React.FC<BannerProps> = ({ paused, onTogglePause }) => {
  return (
    <Container>
      <PauseButton paused={paused} onClick={onTogglePause} />
      <Title />
      <PauseButton paused={paused} onClick={onTogglePause} />
    </Container>
  );
};

export default Banner;

const Container = styled.div`
  display: flex;
  padding: 16px;
`;
