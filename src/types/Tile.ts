import { Block } from "./Block";
import { Guide } from "./Guide";
import { Trail } from "./Trail";

interface BaseTile {
  trail?: Trail;
}

interface BlockTile extends BaseTile {
  type: "block";
  block: Block;
}

interface GuideTile extends BaseTile {
  type: "guide";
  guide: Guide;
}

interface EmptyTile extends BaseTile {
  type: "empty";
}

export type Tile = BlockTile | GuideTile | EmptyTile;
