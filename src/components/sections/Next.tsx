import React from "react";
import Box from "../layout/Box";
import Preview from "../misc/Preview";
import { useGameContext } from "../../providers";

const Next: React.FC = () => {
  const { queue } = useGameContext();

  return (
    <Box title="Next">
      {queue.map((type, index) => (
        <Preview key={index} type={type} />
      ))}
    </Box>
  );
};

export default Next;
