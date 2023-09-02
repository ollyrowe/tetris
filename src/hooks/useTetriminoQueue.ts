import { useCallback, useState } from "react";
import { createTetrimino, getRandomTetriminoType } from "../model";

/**
 * Represents the queue of upcoming tetriminos to be placed
 */
export const useTetriminoQueue = () => {
  const [queue, setQueue] = useState(createItems());

  const getNextTetrimino = useCallback(() => {
    const nextTetrimino = createTetrimino(queue[0]);

    // Remove the first item from the queue and a new one to the end
    setQueue((queue) => [...queue.slice(1), getRandomTetriminoType()]);

    return nextTetrimino;
  }, [queue]);

  return { queue, getNextTetrimino };
};

const createItems = () => {
  return new Array(3).fill(0).map(getRandomTetriminoType);
};
