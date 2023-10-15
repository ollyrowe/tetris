import React from "react";
import Box from "../layout/Box";
import Preview from "../misc/Preview";
import { useGameContext } from "../../providers";

const Hold: React.FC = () => {
  const { status, heldTetrimino } = useGameContext();

  return (
    <Box title="Hold">
      <Preview type={status !== "over" ? heldTetrimino : undefined} />
    </Box>
  );
};

export default Hold;
