import { Block } from "./Block";
import { Guide } from "./Guide";

interface BlockTile {
  type: "block";
  block: Block;
}

interface GuideTile {
  type: "guide";
  guide: Guide;
}

interface EmptyTile {
  type: "empty";
}

export type Tile = BlockTile | GuideTile | EmptyTile;
