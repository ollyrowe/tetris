import React from "react";
import Box from "../layout/Box";
import Preview from "../misc/Preview";
import { useGameContext } from "../../providers";

const Next: React.FC = () => {
  const { queue } = useGameContext();

  // If the queue is empty, fill it with 3 blank items
  const items = queue.length === 0 ? new Array(3).fill(undefined) : queue;

  return (
    <Box title="Next">
      {items.map((type, index) => (
        <Preview key={index} type={type} />
      ))}
    </Box>
  );
};

export default Next;
