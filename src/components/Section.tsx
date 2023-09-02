import React from "react";
import { styled } from "styled-components";
import Box from "./Box";
import { useScreenSize } from "../providers";
import { Size } from "../types";

interface Props {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<Props> = ({ title, children }) => {
  const screenSize = useScreenSize();

  return (
    <StyledBox title={title} margin={screenSize}>
      {children}
    </StyledBox>
  );
};

export default Section;

interface StyledBoxProps {
  margin: Size;
}

const StyledBox = styled(Box)<StyledBoxProps>`
  margin-top: ${(props) => (props.margin === "small" ? "12px" : "24px")};
  min-width: 50px;
  text-align: center;
`;
