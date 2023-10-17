import { useCallback, useMemo } from "react";
import { useStateRef } from "./useStateRef";
import {
  TetriminoType,
  createTetrimino,
  getRandomTetriminoType,
} from "../model";

/**
 * Represents the queue of upcoming tetriminos to be placed
 */
export const useTetriminoQueue = () => {
  const [items, setItems, itemsRef] = useStateRef<TetriminoType[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialise = useCallback(() => setItems(createItems()), []);

  const peekNextTetrimino = useCallback(() => {
    return createTetrimino(itemsRef.current[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNextTetrimino = useCallback(() => {
    const nextTetrimino = createTetrimino(itemsRef.current[0]);

    // Remove the first item from the queue and a new one to the end
    setItems((items) => [...items.slice(1), getRandomTetriminoType()]);

    return nextTetrimino;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reset = useCallback(() => setItems([]), []);

  return useMemo(
    () => ({ items, initialise, peekNextTetrimino, getNextTetrimino, reset }),
    [items, initialise, peekNextTetrimino, getNextTetrimino, reset]
  );
};

const createItems = () => {
  return new Array(3).fill(0).map(getRandomTetriminoType);
};
