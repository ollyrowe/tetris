import { useState, useRef, useCallback } from "react";
import { useInterval, IntervalCallback } from "./useInterval";
import { useTetriminoQueue } from "./useTetriminoQueue";
import { Tetrimino, createTetrimino, TetriminoType } from "../model";
import { Block, Guide, MoveableDirection, Tile } from "../types";

export const useGame = () => {
  // The number of points the player has
  const [points, setPoints] = useState(0);

  // The number of complete rows the player has made
  const [lines, setLines] = useState(0);

  // The current speed level the player is on
  const level = getLevel(lines);

  // Whether the game is over
  const [over, setOver] = useState(false);

  // The placed blocks
  const blocks = useRef<Block[]>([]);

  // The queue of upcoming tetriminos to be placed
  const { queue, getNextTetrimino } = useTetriminoQueue();

  // The current tetrimino being placed
  const tetrimino = useRef(createTetrimino());

  // The tetrimino currently on hold
  const [heldTetrimino, setHeldTetrimino] = useState<TetriminoType>();

  // Whether the current tetrimino has already been held this turn
  const hasSwitchedHeldTetrimino = useRef(false);

  // The tiles representing the game board
  const [tiles, setTiles] = useState(createTiles());

  const updateTiles = () => {
    setTiles(createTiles(blocks.current, tetrimino.current));
  };

  const addPoints = useCallback(
    (points: number) => {
      setPoints((currentPoints) => currentPoints + points * level);
    },
    [level]
  );

  const callback = useCallback<IntervalCallback>(
    ({ stop }) => {
      if (
        hasBlockBelowTetrimino(blocks.current, tetrimino.current) ||
        hasReachedBoardBottom(tetrimino.current)
      ) {
        blocks.current.push(...tetrimino.current.blocks);

        // Set the next tetrimino type in the queue to be the current
        tetrimino.current = getNextTetrimino();

        // Reset the has switched held tetrimino state
        hasSwitchedHeldTetrimino.current = false;

        if (hasCollision(tetrimino.current.blocks, blocks.current)) {
          setOver(true);

          return stop();
        }

        const completedRows = findCompletedRows(blocks.current);

        for (const completedRow of completedRows.sort()) {
          // Remove all blocks within the completed row
          blocks.current = blocks.current.filter(
            (block) => block.y !== completedRow
          );

          // Shift all blocks above the completed row downwards
          blocks.current = blocks.current.map((block) =>
            block.y < completedRow ? { ...block, y: block.y + 1 } : block
          );

          // Update the completed lines
          setLines((lines) => lines + 1);
        }

        // Add the appropriate number of points
        switch (completedRows.length) {
          case 1:
            addPoints(pointValues.singleLineClear);
            break;
          case 2:
            addPoints(pointValues.doubleLineClear);
            break;
          case 3:
            addPoints(pointValues.tripleLineClear);
            break;
          case 4:
            addPoints(pointValues.tetrisLineClear);
            break;
        }
      } else {
        tetrimino.current.move("down");
      }

      updateTiles();
    },
    [getNextTetrimino, addPoints]
  );

  const gameLoop = useInterval(callback, levelSpeeds[level]);

  const { paused, pause } = gameLoop;

  const play = () => {
    if (!over) {
      gameLoop.play();
    }
  };

  const moveTetrimino = useCallback(
    (direction: MoveableDirection) => {
      if (!over && !paused) {
        const movedTetrimino = tetrimino.current.getMovedBlocks(direction);

        // Ensure the updated blocks haven't gone outside the board or collided with another block
        if (
          !hasBreachedBoardBounds(movedTetrimino.blocks) &&
          !hasCollision(movedTetrimino.blocks, blocks.current)
        ) {
          if (direction === "down") {
            // The player is granted points for triggering a decent
            addPoints(pointValues.drop);
          }

          tetrimino.current.move(direction);

          updateTiles();
        }
      }
    },
    [addPoints, over, paused]
  );

  const rotateTetrimino = () => {
    if (!over && !paused) {
      const rotatedBlocks = tetrimino.current.getRotatedBlocks();

      // Ensure the updated blocks haven't gone outside the board or collided with another block
      if (
        !hasBreachedBoardBounds(rotatedBlocks) &&
        !hasCollision(rotatedBlocks, blocks.current)
      ) {
        tetrimino.current.rotate();

        updateTiles();
      }
    }
  };

  const holdTetrimino = () => {
    // If the player hasn't already switched the held tetrimino
    if (!over && !paused && !hasSwitchedHeldTetrimino.current) {
      if (heldTetrimino) {
        const currentlyHeldTetrimino = heldTetrimino;

        setHeldTetrimino(tetrimino.current.type);

        tetrimino.current = createTetrimino(currentlyHeldTetrimino);

        hasSwitchedHeldTetrimino.current = true;
      } else {
        setHeldTetrimino(tetrimino.current.type);

        // Set the next tetrimino type in the queue to be the current
        tetrimino.current = getNextTetrimino();
      }

      updateTiles();
    }
  };

  const stats = { points, lines, level };

  const controls = {
    moveTetrimino,
    rotateTetrimino,
    holdTetrimino,
    pause,
    play,
  };

  return {
    stats,
    over,
    tiles,
    queue,
    heldTetrimino,
    controls,
    paused,
  };
};

const createTiles = (blocks: Block[] = [], tetrimino?: Tetrimino) => {
  const rows: Tile[][] = [];

  // The guides to show where the tetrimino will fall
  const guides: Guide[] = [];

  // If a tetrimino has been provided, figure out where the guide should go
  if (tetrimino) {
    let guideTetrimino = tetrimino;
    let shiftedTetrimino = tetrimino;

    // Move the tetrimino down until a collision is detected
    while (
      !hasCollision(shiftedTetrimino.blocks, blocks) &&
      !hasBreachedBoardBounds(shiftedTetrimino.blocks)
    ) {
      guideTetrimino = shiftedTetrimino;

      shiftedTetrimino = shiftedTetrimino.clone();

      shiftedTetrimino.move("down");
    }

    guideTetrimino.blocks.forEach((block) => {
      guides.push(block);
    });
  }

  for (let y = 0; y < board.height; y++) {
    const row: Tile[] = [];

    for (let x = 0; x < board.width; x++) {
      const block = blocks.find((block) => block.x === x && block.y === y);

      if (block) {
        row.push({ type: "block", block });
      } else {
        const tetriminoBlock = tetrimino?.blocks.find(
          (block) => block.x === x && block.y === y
        );

        if (tetriminoBlock) {
          row.push({ type: "block", block: tetriminoBlock });
        } else {
          const guide = guides.find((guide) => guide.x === x && guide.y === y);

          if (guide) {
            row.push({ type: "guide", guide });
          } else {
            row.push({ type: "empty" });
          }
        }
      }
    }

    rows.push(row);
  }

  return rows;
};

const hasBreachedBoardBounds = (blocks: Block[]) => {
  return !!blocks.find(
    (block) =>
      block.x < 0 ||
      block.x >= board.width ||
      block.y < 0 ||
      block.y >= board.height
  );
};

const hasBlockBelowTetrimino = (blocks: Block[], tetrimino: Tetrimino) => {
  return !!blocks.find(
    (block) =>
      !!tetrimino.blocks.find(
        (tetriminoBlock) =>
          block.x === tetriminoBlock.x && block.y === tetriminoBlock.y + 1
      )
  );
};

const hasReachedBoardBottom = (tetrimino: Tetrimino) => {
  return !!tetrimino.blocks.find((block) => block.y === board.height - 1);
};

const hasCollision = (tetriminoBlocks: Block[], blocks: Block[]) => {
  return !!blocks.find(
    (block) =>
      !!tetriminoBlocks.find(
        (tetriminoBlock) =>
          block.x === tetriminoBlock.x && block.y === tetriminoBlock.y
      )
  );
};

const findCompletedRows = (blocks: Block[]) => {
  const completedRows: number[] = [];

  // Search for a completed row from the bottom of the board
  for (let y = board.height - 1; y >= 0; y--) {
    for (let x = 0; x < board.width; x++) {
      // If there isn't a block at this location
      if (!blocks.find((block) => block.x === x && block.y === y)) {
        // Stop searching this row
        break;
      } else {
        // If this is the last block within the row
        if (x === board.width - 1) {
          completedRows.push(y);
        }
      }
    }
  }

  return completedRows;
};

const getLevel = (lines: number): Level => {
  if (lines < 10) {
    return 1;
  } else if (lines < 20) {
    return 2;
  } else if (lines < 30) {
    return 3;
  } else if (lines < 40) {
    return 4;
  } else if (lines < 50) {
    return 5;
  }

  return 6;
};

const levelSpeeds: { [level in Level]: number } = {
  1: 1000,
  2: 650,
  3: 450,
  4: 300,
  5: 200,
  6: 150,
};

const pointValues = {
  drop: 1,
  singleLineClear: 100,
  doubleLineClear: 300,
  tripleLineClear: 500,
  tetrisLineClear: 800,
};

// Board configs
const board = { width: 10, height: 20 };

type Level = 1 | 2 | 3 | 4 | 5 | 6;
