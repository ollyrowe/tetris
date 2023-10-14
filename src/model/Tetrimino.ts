import { Block, Coordinates, Direction, MoveableDirection } from "../types";

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
      this.blocks = this.getRotatedBlocks();

      this.center = this.getRotatedCenter();

      this.orientation = getNextClockwiseDirection(this.orientation);
    }
  }

  public getRotatedBlocks() {
    // The "I" tetrimino is the only one that rotates counter clockwise
    const direction = this.type === "I" ? "counter-clockwise" : "clockwise";

    const rotatedBlocks = this.blocks.map((block) => {
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

    return rotatedBlocks;
  }

  public getRotatedCenter() {
    // The "I" tetrimino is the only one with a different center after rotation
    if (this.type === "I") {
      switch (this.orientation) {
        case "up":
          return { x: this.center.x, y: this.center.y + 1 };
        case "right":
          return { x: this.center.x - 1, y: this.center.y };
        case "down":
          return { x: this.center.x, y: this.center.y - 1 };
        case "left":
          return { x: this.center.x + 1, y: this.center.y };
      }
    }

    return this.center;
  }

  public clone(): Tetrimino {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}

const createTetriminoBlocks = (type: TetriminoType) => {
  switch (type) {
    case "I":
      return {
        center: { x: 5, y: 0 },
        blocks: [
          { type, x: 3, y: 0 },
          { type, x: 4, y: 0 },
          { type, x: 5, y: 0 },
          { type, x: 6, y: 0 },
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
        center: { x: 4, y: 0 },
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
