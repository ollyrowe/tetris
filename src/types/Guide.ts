import { Coordinates } from "./Coordinates";
import { TetriminoType } from "../model";

export interface Guide extends Coordinates {
  type: TetriminoType;
}
