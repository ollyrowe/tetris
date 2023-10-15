import { Block, Coordinates, Direction, MoveableDirection } from "../types";
import { board } from "../constants";

export class Tetrimino {
  type: TetriminoType;
  blocks: Block[];
  center: Coordinates;
  orientation: Direction;

  constructor(type: TetriminoType) {
    const { blocks, center } = createTetriminoBlocks(type);

    this.type = type;
    this.blocks = blocks;
    this.center = center;
    this.orientation = "up";
  }

  public move(direction: MoveableDirection) {
    const { blocks, center } = this.getMovedBlocks(direction);

    this.blocks = blocks;
    this.center = center;
  }

  public getMovedBlocks(direction: MoveableDirection) {
    switch (direction) {
      case "left":
        return {
          blocks: this.blocks.map((block) => ({
            ...block,
            x: block.x - 1,
          })),
          center: { ...this.center, x: this.center.x - 1 },
        };
      case "right":
        return {
          blocks: this.blocks.map((block) => ({
            ...block,
            x: block.x + 1,
          })),
          center: { ...this.center, x: this.center.x + 1 },
        };
      case "down":
        return {
          blocks: this.blocks.map((block) => ({
            ...block,
            y: block.y + 1,
          })),
          center: { ...this.center, y: this.center.y + 1 },
        };
    }
  }

  public rotate() {
    // "O" tetriminos cannot be rotated
    if (this.type !== "O") {
      const { rotatedBlocks, rotatedCenter } = this.getRotatedState();

      this.blocks = rotatedBlocks;

      this.center = rotatedCenter;

      this.orientation = getNextClockwiseDirection(this.orientation);
    }
  }

  public getRotatedState() {
    // The "I" tetrimino is the only one that rotates counter clockwise
    const direction = this.type === "I" ? "counter-clockwise" : "clockwise";

    let rotatedBlocks = this.blocks.map((block) => {
      const delta = {
        x: block.x - this.center.x,
        y: block.y - this.center.y,
      };

      if (direction === "clockwise") {
        return {
          ...block,
          x: this.center.x - delta.y,
          y: this.center.y + delta.x,
        };
      } else {
        return {
          ...block,
          x: this.center.x + delta.y,
          y: this.center.y - delta.x,
        };
      }
    });

    let rotatedCenter = { ...this.center };

    // The "I" tetrimino is the only one with a different center after rotation
    if (this.type === "I") {
      switch (this.orientation) {
        case "up":
          rotatedCenter = { x: this.center.x, y: this.center.y + 1 };
          break;
        case "right":
          rotatedCenter = { x: this.center.x - 1, y: this.center.y };
          break;
        case "down":
          rotatedCenter = { x: this.center.x, y: this.center.y - 1 };
          break;
        case "left":
          rotatedCenter = { x: this.center.x + 1, y: this.center.y };
          break;
      }
    }

    const xValues = rotatedBlocks.map((block) => block.x);

    // Find the upper and lower bounds of the rotated tetrimino blocks
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);

    // If the rotated tetrimino has moved outside the left side of board, move it inwards
    if (minX < 0) {
      const shift = minX * -1;

      rotatedCenter = { ...rotatedCenter, x: rotatedCenter.x + shift };

      rotatedBlocks = rotatedBlocks.map((block) => ({
        ...block,
        x: block.x + shift,
      }));
    }

    // If the rotated tetrimino has moved outside the right side of board, move it inwards
    if (maxX >= board.width) {
      const shift = maxX - board.width + 1;

      rotatedCenter = { ...rotatedCenter, x: rotatedCenter.x - shift };

      rotatedBlocks = rotatedBlocks.map((block) => ({
        ...block,
        x: block.x - shift,
      }));
    }

    return { rotatedBlocks, rotatedCenter };
  }

  public clone(): Tetrimino {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}

const createTetriminoBlocks = (type: TetriminoType) => {
  switch (type) {
    case "I":
      return {
        center: { x: 5, y: 1 },
        blocks: [
          { type, x: 3, y: 1 },
          { type, x: 4, y: 1 },
          { type, x: 5, y: 1 },
          { type, x: 6, y: 1 },
        ],
      };
    case "O":
      return {
        center: { x: 4, y: 0 },
        blocks: [
          { type, x: 4, y: 0 },
          { type, x: 5, y: 0 },
          { type, x: 4, y: 1 },
          { type, x: 5, y: 1 },
        ],
      };
    case "T":
      return {
        center: { x: 4, y: 1 },
        blocks: [
          { type, x: 4, y: 0 },
          { type, x: 3, y: 1 },
          { type, x: 4, y: 1 },
          { type, x: 5, y: 1 },
        ],
      };
    case "J":
      return {
        center: { x: 4, y: 1 },
        blocks: [
          { type, x: 3, y: 0 },
          { type, x: 3, y: 1 },
          { type, x: 4, y: 1 },
          { type, x: 5, y: 1 },
        ],
      };
    case "L":
      return {
        center: { x: 4, y: 1 },
        blocks: [
          { type, x: 5, y: 0 },
          { type, x: 3, y: 1 },
          { type, x: 4, y: 1 },
          { type, x: 5, y: 1 },
        ],
      };
    case "S":
      return {
        center: { x: 4, y: 1 },
        blocks: [
          { type, x: 4, y: 0 },
          { type, x: 5, y: 0 },
          { type, x: 3, y: 1 },
          { type, x: 4, y: 1 },
        ],
      };
    case "Z":
      return {
        center: { x: 4, y: 1 },
        blocks: [
          { type, x: 3, y: 0 },
          { type, x: 4, y: 0 },
          { type, x: 4, y: 1 },
          { type, x: 5, y: 1 },
        ],
      };
  }
};

export const createTetrimino = (type = getRandomTetriminoType()) => {
  return new Tetrimino(type);
};

export const getRandomTetriminoType = () => {
  const index = Math.floor(Math.random() * tetriminoTypes.length);

  return tetriminoTypes[index];
};

const tetriminoTypes: TetriminoType[] = ["I", "O", "T", "J", "L", "S", "Z"];

const getNextClockwiseDirection = (direction: Direction): Direction => {
  switch (direction) {
    case "up":
      return "right";
    case "down":
      return "left";
    case "left":
      return "up";
    case "right":
      return "down";
  }
};

export type TetriminoType = "I" | "O" | "T" | "J" | "L" | "S" | "Z";
