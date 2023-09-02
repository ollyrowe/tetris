import { Coordinates } from "./Coordinates";
import { TetriminoType } from "../model";

export interface Block extends Coordinates {
  type: TetriminoType;
}
