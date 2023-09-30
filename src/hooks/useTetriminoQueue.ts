import { useCallback } from "react";
import { useStateRef } from "./useStateRef";
import { createTetrimino, getRandomTetriminoType } from "../model";

/**
 * Represents the queue of upcoming tetriminos to be placed
 */
export const useTetriminoQueue = () => {
  const [queue, setQueue, queueRef] = useStateRef(createItems());

  const getNextTetrimino = useCallback(() => {
    const nextTetrimino = createTetrimino(queueRef.current[0]);

    // Remove the first item from the queue and a new one to the end
    setQueue((queue) => [...queue.slice(1), getRandomTetriminoType()]);

    return nextTetrimino;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { queue, getNextTetrimino };
};

const createItems = () => {
  return new Array(3).fill(0).map(getRandomTetriminoType);
};
