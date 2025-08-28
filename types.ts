
export interface Coordinates {
  x: number;
  y: number;
}

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export enum GameState {
  IDLE,
  RUNNING,
  GAME_OVER,
}
