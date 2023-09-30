import React from "react";
import { styled } from "styled-components";
import Box from "../layout/Box";

interface Props {
  points: number;
}

const Score: React.FC<Props> = ({ points }) => {
  return <StyledBox title="Score">{points}</StyledBox>;
};

export default Score;

const StyledBox = styled(Box)`
  min-width: 190px;
  text-align: right;
`;
