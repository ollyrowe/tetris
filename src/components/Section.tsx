import React from "react";
import { styled } from "styled-components";
import Box from "./Box";
import { ScreenType, useScreenType } from "../providers";

interface Props {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<Props> = ({ title, children }) => {
  const screenType = useScreenType();

  return (
    <StyledBox title={title} margin={screenType}>
      {children}
    </StyledBox>
  );
};

export default Section;

interface StyledBoxProps {
  margin: ScreenType;
}

const StyledBox = styled(Box)<StyledBoxProps>`
  margin-top: 24px;
  min-width: 50px;
  text-align: center;
`;
