import { Coordinates } from "./Coordinates";

export interface Trail extends Coordinates {
  id: number;
  length: number;
}
