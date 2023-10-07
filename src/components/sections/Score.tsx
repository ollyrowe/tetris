import React from "react";
import { styled } from "styled-components";
import Box from "../layout/Box";
import { useGameContext } from "../../providers";

const Score: React.FC = () => {
  const { status, stats } = useGameContext();

  return (
    <StyledBox title="Score">
      {status === "idle" ? "-" : stats.points}
    </StyledBox>
  );
};

export default Score;

const StyledBox = styled(Box)`
  min-width: 190px;
  text-align: right;
`;
