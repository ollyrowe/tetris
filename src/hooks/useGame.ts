import { useState, useRef, useCallback, useEffect } from "react";
import { useInterval, IntervalCallback } from "./useInterval";
import { useTetriminoQueue } from "./useTetriminoQueue";
import { useHighScores } from "./useHighScores";
import { useLocalStorage } from "./useLocalStorage";
import { Tetrimino, createTetrimino, TetriminoType } from "../model";
import { Block, Guide, MoveableDirection, Tile, Trail } from "../types";
import {
  board,
  lineClearAnimationLength,
  lineClearResumeDelay,
  trailAnimationLength,
} from "../constants";

export const useGame = () => {
  // The number of points the player has
  const [points, setPoints] = useState(0);

  // The number of complete rows the player has made
  const [lines, setLines] = useState(0);

  // The level the game will start at
  const [startLevel, setStartLevel] = useLocalStorage<Level>("start-level", 1);

  // The current speed level that the game is set to
  const [level, setLevel] = useState<Level>(1);

  // The current status of the game
  const [status, setStatus] = useState<GameStatus>("idle");

  // The placed blocks
  const blocks = useRef<Block[]>([]);

  // The trails of the tetriminos that have been hard dropped
  const trails = useRef<Trail[]>([]);

  // The queue of upcoming tetriminos to be placed
  const queue = useTetriminoQueue();

  // The current tetrimino being placed
  const tetrimino = useRef(createTetrimino());

  // The tetrimino currently on hold
  const [heldTetrimino, setHeldTetrimino] = useState<TetriminoType>();

  // Whether the current tetrimino has already been held this turn
  const hasSwitchedHeldTetrimino = useRef(false);

  // The tiles representing the game board
  const [tiles, setTiles] = useState(createTiles());

  // The past high scores
  const { highScores, recordScore } = useHighScores();

  // The ID of the current soft drop interval
  const softDropInterval = useRef<number>();

  const updateTiles = () => {
    setTiles(createTiles(blocks.current, tetrimino.current, trails.current));
  };

  const addPoints = useCallback(
    (points: number) => {
      setPoints((currentPoints) => currentPoints + points * level);
    },
    [level]
  );

  const callback = useCallback<IntervalCallback>(
    ({ pause }) => {
      if (status === "playing") {
        if (
          hasBlockBelowTetrimino(blocks.current, tetrimino.current) ||
          hasReachedBoardBottom(tetrimino.current)
        ) {
          blocks.current.push(...tetrimino.current.blocks);

          // Get the next tetrimino in the queue without removing it
          const nextTetrimino = queue.peekNextTetrimino();

          // If the next tetrimino will have already collided with another block then the game is over
          if (hasCollision(nextTetrimino.blocks, blocks.current)) {
            setStatus("over");

            recordScore(points);

            return pause();
          }

          const completedRows = findCompletedRows(blocks.current);

          // If there aren't any completed rows, then we can get the next tetrimino
          if (completedRows.length === 0) {
            // Update the tetrimino to be the next one in the queue
            tetrimino.current = queue.getNextTetrimino();

            // Reset the has switched held tetrimino state
            hasSwitchedHeldTetrimino.current = false;
          }

          for (const completedRow of completedRows) {
            // Mark all blocks in the completed row as cleared
            blocks.current = blocks.current.map((block) =>
              block.y === completedRow ? { ...block, cleared: true } : block
            );
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
      }
    },
    [status, queue, addPoints, points, recordScore]
  );

  const gameLoop = useInterval(callback, levelSpeeds[level]);

  /**
   * Effect which removes any completed rows and shifts the blocks above downwards.
   *
   * The game is paused during this effect to allow time for the cleared blocks to animate.
   */
  useEffect(() => {
    // Identify the unique rows which have been completed
    const completedRows: number[] = [];

    for (const row of tiles) {
      for (const tile of row) {
        if (tile.type === "block" && tile.block.cleared) {
          completedRows.push(tile.block.y);
          break;
        }
      }
    }

    if (completedRows.length === 0) {
      return;
    }

    // Sort the completed rows numerically so that the blocks within the highest rows are removed first
    completedRows.sort((a, b) => a - b);

    // Pause the game to animate the line clear
    gameLoop.pause();

    for (const completedRow of completedRows) {
      // Remove all blocks within the completed row
      blocks.current = blocks.current.filter(
        (block) => block.y !== completedRow
      );

      // Shift all blocks above the completed row downwards
      blocks.current = blocks.current.map((block) =>
        block.y < completedRow ? { ...block, y: block.y + 1 } : block
      );

      // Shift all trails above the completed row downwards
      trails.current = trails.current.map((trail) =>
        trail.y < completedRow ? { ...trail, y: trail.y + 1 } : trail
      );
    }

    // Update the number of completed lines
    setLines((lines) => lines + completedRows.length);

    // After the animation has been completed, resume the game loop
    setTimeout(() => {
      // Update the tetrimino to be the next one in the queue
      tetrimino.current = queue.getNextTetrimino();

      // Reset the has switched held tetrimino state
      hasSwitchedHeldTetrimino.current = false;

      gameLoop.play({ immediate: true });
    }, lineClearAnimationLength + lineClearResumeDelay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiles, queue]);

  /**
   * Effect which updates the game level based on the number of lines completed.
   */
  useEffect(() => {
    // Calculate the current level based on the current number of lines completed
    const nextLevel = getLevel(lines);

    // Prevent the level from going down (i.e. if the game was started at a higher level)
    if (nextLevel > startLevel) {
      setLevel(nextLevel);
    }
  }, [lines, startLevel]);

  const pause = () => {
    if (status === "playing") {
      gameLoop.pause();

      setStatus("paused");
    }
  };

  const play = () => {
    if (status === "paused") {
      gameLoop.play();

      setStatus("playing");
    }
  };

  /**
   * Resets the game state
   */
  const reset = () => {
    gameLoop.pause();

    setLevel(1);
    setLines(0);
    setPoints(0);
    setHeldTetrimino(undefined);

    queue.reset();

    blocks.current = [];
    trails.current = [];
    tetrimino.current = createTetrimino();
    hasSwitchedHeldTetrimino.current = false;

    setTiles(createTiles());
  };

  const start = () => {
    reset();

    setLevel(startLevel);

    queue.initialise();

    updateTiles();

    gameLoop.play();

    setStatus("playing");
  };

  const quit = () => {
    reset();

    setStatus("idle");
  };

  const clearSoftDropInterval = useCallback(() => {
    clearInterval(softDropInterval.current);
    softDropInterval.current = undefined;
  }, []);

  const cancelSoftDrop = useCallback(() => {
    if (status === "playing") {
      clearSoftDropInterval();

      gameLoop.play();
    }
  }, [status, clearSoftDropInterval, gameLoop]);

  const moveTetrimino = useCallback(
    (direction: MoveableDirection) => {
      if (status === "playing") {
        const movedTetrimino = tetrimino.current.getMovedBlocks(direction);

        // Ensure the updated blocks haven't gone outside the board or collided with another block
        if (
          !hasBreachedBoardBounds(movedTetrimino.blocks) &&
          !hasCollision(movedTetrimino.blocks, blocks.current)
        ) {
          if (direction === "down") {
            // The player is granted points for triggering a decent
            addPoints(pointValues.softDrop);
          }

          tetrimino.current.move(direction);

          updateTiles();
        } else {
          // Cancel the soft drop if there is one
          cancelSoftDrop();
        }
      }
    },
    [status, addPoints, cancelSoftDrop]
  );

  const softDropTetrimino = useCallback(() => {
    if (status === "playing") {
      // If not already performing a soft drop
      if (typeof softDropInterval.current === "undefined") {
        // Pause game loop to take control of the tetrimino
        gameLoop.pause();

        // Move the tetrimino down every 50 milliseconds
        softDropInterval.current = setInterval(() => moveTetrimino("down"), 50);
      }
    }
  }, [status, gameLoop, moveTetrimino]);

  const hardDropTetrimino = useCallback(() => {
    if (status === "playing") {
      // Pause game loop to take control of the tetrimino
      gameLoop.pause();

      // Stop the soft drop loop if it is running
      clearSoftDropInterval();

      // Record the vertical position of the tetrimino before it's dropped
      const initialVerticalPosition = tetrimino.current.center.y;

      // Drop the tetrimino to the bottom of the board
      const droppedTetrimino = getDroppedTetrimino(
        tetrimino.current,
        blocks.current
      );

      // Create a set of trails for the dropped tetrimino
      const droppedTetriminoTrails = createTrails(
        droppedTetrimino,
        initialVerticalPosition
      );

      // Remove any trails at the same location
      trails.current = trails.current.filter((trail) =>
        droppedTetriminoTrails.find(
          (droppedTetriminoTrail) =>
            droppedTetriminoTrail.x === trail.x &&
            droppedTetriminoTrail.y === trail.y
        )
      );

      // Add the trails to the existing trails
      trails.current.push(...droppedTetriminoTrails);

      // Clear up the trails once the animation has finished
      setTimeout(() => {
        trails.current = trails.current.filter(
          (trail) =>
            !droppedTetriminoTrails.find(
              (droppedTetriminoTrail) => droppedTetriminoTrail.id === trail.id
            )
        );
        // Give some leeway after the animation has finished before resuming the game loop
      }, trailAnimationLength * 2);

      // Calculate the distance the tetrimino has dropped
      const droppedDistance =
        droppedTetrimino.center.y - tetrimino.current.center.y;

      // Add the appropriate number of points
      addPoints(pointValues.hardDrop * droppedDistance);

      tetrimino.current = droppedTetrimino;

      updateTiles();

      // Resume the game loop immediately (setTimeout to wait for the points state to update)
      setTimeout(() => gameLoop.play({ immediate: true }), 0);
    }
  }, [status, clearSoftDropInterval, addPoints, gameLoop]);

  const rotateTetrimino = () => {
    if (status === "playing") {
      const { rotatedBlocks } = tetrimino.current.getRotatedState();

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
    if (status === "playing" && !hasSwitchedHeldTetrimino.current) {
      if (heldTetrimino) {
        const currentlyHeldTetrimino = heldTetrimino;

        setHeldTetrimino(tetrimino.current.type);

        tetrimino.current = createTetrimino(currentlyHeldTetrimino);

        hasSwitchedHeldTetrimino.current = true;
      } else {
        setHeldTetrimino(tetrimino.current.type);

        // Set the next tetrimino type in the queue to be the current
        tetrimino.current = queue.getNextTetrimino();
      }

      updateTiles();
    }
  };

  const stats = { points, lines, level };

  const controls = {
    moveTetrimino,
    softDropTetrimino,
    hardDropTetrimino,
    cancelSoftDrop,
    rotateTetrimino,
    holdTetrimino,
    pause,
    play,
    start,
    quit,
  };

  return {
    status,
    stats,
    tiles,
    queue: queue.items,
    heldTetrimino,
    controls,
    highScores,
    startLevel,
    setStartLevel,
  };
};

const createTiles = (
  blocks: Block[] = [],
  tetrimino?: Tetrimino,
  trails: Trail[] = []
) => {
  const rows: Tile[][] = [];

  // The guides to show where the tetrimino will fall
  const guides: Guide[] = [];

  // If a tetrimino has been provided, figure out where the guide should go
  if (tetrimino) {
    const guideTetrimino = getDroppedTetrimino(tetrimino, blocks);

    guideTetrimino.blocks.forEach((block) => {
      guides.push(block);
    });
  }

  for (let y = 0; y < board.height; y++) {
    const row: Tile[] = [];

    for (let x = 0; x < board.width; x++) {
      const block = blocks.find((block) => block.x === x && block.y === y);

      const trail = trails.find((trail) => trail.x === x && trail.y === y);

      if (block) {
        row.push({ type: "block", block, trail });
      } else {
        const tetriminoBlock = tetrimino?.blocks.find(
          (block) => block.x === x && block.y === y
        );

        if (tetriminoBlock) {
          row.push({ type: "block", block: tetriminoBlock, trail });
        } else {
          const guide = guides.find((guide) => guide.x === x && guide.y === y);

          if (guide) {
            row.push({ type: "guide", guide, trail });
          } else {
            row.push({ type: "empty", trail });
          }
        }
      }
    }

    rows.push(row);
  }

  return rows;
};

const getDroppedTetrimino = (tetrimino: Tetrimino, blocks: Block[]) => {
  let droppedTetrimino = tetrimino;
  let shiftedTetrimino = tetrimino;

  // Move the tetrimino down until a collision is detected
  while (
    !hasCollision(shiftedTetrimino.blocks, blocks) &&
    !hasBreachedBoardBounds(shiftedTetrimino.blocks)
  ) {
    droppedTetrimino = shiftedTetrimino;

    shiftedTetrimino = shiftedTetrimino.clone();

    shiftedTetrimino.move("down");
  }

  return droppedTetrimino;
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

const createTrails = (
  tetrimino: Tetrimino,
  verticalOrigin: number
): Trail[] => {
  // Get all of the top-most blocks which make up the tetrimino
  const topBlocks = tetrimino.blocks.filter((block) => {
    // Check if there is another block which is above the current block
    return !tetrimino.blocks.some((otherBlock) => {
      return (
        otherBlock !== block &&
        otherBlock.x === block.x &&
        otherBlock.y < block.y
      );
    });
  });

  // Create a trail for each of the top blocks
  const trails = topBlocks.map((block) => {
    return {
      id: trailCounter++,
      x: block.x,
      y: block.y - 1,
      length: block.y - verticalOrigin + 1,
    };
  });

  return trails;
};

// Trail counter to give each trail a unique ID
let trailCounter = 0;

const getLevel = (lines: number): Level => {
  if (lines < 10) {
    return 1;
  } else if (lines < 20) {
    return 2;
  } else if (lines < 35) {
    return 3;
  } else if (lines < 55) {
    return 4;
  } else if (lines < 80) {
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
  softDrop: 1,
  hardDrop: 2,
  singleLineClear: 100,
  doubleLineClear: 300,
  tripleLineClear: 500,
  tetrisLineClear: 800,
};

export type GameStatus = "playing" | "paused" | "over" | "idle";

export type Level = 1 | 2 | 3 | 4 | 5 | 6;
