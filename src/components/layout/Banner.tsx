import React from "react";
import { styled } from "styled-components";
import Title from "./Title";

const Banner: React.FC = () => {
  return (
    <Container>
      <Title />
    </Container>
  );
};

export default Banner;

const Container = styled.div`
  display: flex;
  padding: 16px;
`;
