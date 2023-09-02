import React from "react";
import { styled } from "styled-components";
import Box from "./Box";
import { useScreenSize } from "../providers";
import { Size } from "../types";

interface Props {
  points: number;
}

const Score: React.FC<Props> = ({ points }) => {
  const screenSize = useScreenSize();

  return (
    <StyledBox title="Score" size={screenSize}>
      {points}
    </StyledBox>
  );
};

export default Score;

interface StyledBoxProps {
  size: Size;
}

const StyledBox = styled(Box)<StyledBoxProps>`
  min-width: ${(props) => (props.size === "small" ? "90px" : "140px")};
  text-align: right;
`;
