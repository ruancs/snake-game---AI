import { Coordinates } from './types';

export const BOARD_SIZE = 20;
export const CELL_SIZE_PX = 20;

const SNAKE_START_X = Math.floor(BOARD_SIZE / 2);
const SNAKE_START_Y = Math.floor(BOARD_SIZE / 2);

export const INITIAL_SNAKE_POSITION: Coordinates[] = [
  { x: SNAKE_START_X, y: SNAKE_START_Y },
  { x: SNAKE_START_X - 1, y: SNAKE_START_Y },
  { x: SNAKE_START_X - 2, y: SNAKE_START_Y },
];

export const INITIAL_SPEED_MS = 200;
export const SPEED_INCREMENT = 5;