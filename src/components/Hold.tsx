import React from "react";
import Box from "./Box";
import Preview from "./Preview";
import { TetriminoType } from "../model";

interface Props {
  type?: TetriminoType;
}

const Hold: React.FC<Props> = ({ type }) => {
  return (
    <Box title="Hold">
      <Preview type={type} />
    </Box>
  );
};

export default Hold;
