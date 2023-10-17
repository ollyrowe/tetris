import React from "react";
import Box from "../layout/Box";
import Preview from "../misc/Preview";
import { useGameContext } from "../../providers";

const Hold: React.FC = () => {
  const { heldTetrimino } = useGameContext();

  return (
    <Box title="Hold">
      <Preview type={heldTetrimino} />
    </Box>
  );
};

export default Hold;
