export type Direction = "up" | "down" | "left" | "right";

export type MoveableDirection = Extract<Direction, "left" | "right" | "down">;
