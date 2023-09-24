import React from "react";
import { styled } from "styled-components";

interface Props {
  children: React.ReactNode;
}

const Background: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <Image />
      <Contents>{children}</Contents>
    </Container>
  );
};

export default Background;

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Image = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: url(./background.png);
  background-size: cover;
  background-position: center;
  opacity: 0.85;
  filter: blur(12px);
  transform: scale(1.1);
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
