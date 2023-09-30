import React from "react";
import { styled } from "styled-components";
import { useScreenType, ScreenType } from "../../providers";

const Title: React.FC = () => {
  const screenType = useScreenType();

  return (
    <Container screenType={screenType}>
      <Image alt="Tetris" src="/tetris/title.png" />
    </Container>
  );
};

export default Title;

interface ContainerProps {
  screenType: ScreenType;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: fill;
  height: ${(props) => (props.screenType === "desktop" ? "60px" : "40px")};
  background-color: #3a3a3a;
  border: 4px solid #c1c1c1;
  border-radius: 8px;
  box-shadow: 1px 1px 12px 0px black;
  padding: 2px;
`;

const Image = styled.img`
  height: 100%;
  margin: auto;
`;
