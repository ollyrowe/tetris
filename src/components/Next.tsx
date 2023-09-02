import React from "react";
import Box from "./Box";
import Preview from "./Preview";
import { TetriminoType } from "../model";

interface Props {
  queue: TetriminoType[];
}

const Next: React.FC<Props> = ({ queue }) => {
  return (
    <Box title="Next">
      {queue.map((type, index) => (
        <Preview key={index} type={type} />
      ))}
    </Box>
  );
};

export default Next;
