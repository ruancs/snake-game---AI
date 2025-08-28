
import { useState, useEffect, useCallback } from 'react';
import { Coordinates, Direction, GameState } from '../types';
import { BOARD_SIZE, INITIAL_SNAKE_POSITION, INITIAL_SPEED_MS, SPEED_INCREMENT } from '../constants';

const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [snake, setSnake] = useState<Coordinates[]>(INITIAL_SNAKE_POSITION);
  const [food, setFood] = useState<Coordinates>(() => generateRandomFood(INITIAL_SNAKE_POSITION));
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED_MS);
  const [score, setScore] = useState<number>(0);

  const resetGame = useCallback(() => {
    setGameState(GameState.IDLE);
    setSnake(INITIAL_SNAKE_POSITION);
    setFood(generateRandomFood(INITIAL_SNAKE_POSITION));
    setDirection(Direction.RIGHT);
    setSpeed(INITIAL_SPEED_MS);
    setScore(0);
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setGameState(GameState.RUNNING);
  }, [resetGame]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameState === GameState.IDLE) {
      startGame();
      return;
    }

    let newDirection: Direction | null = null;
    switch (e.key.toLowerCase()) {
      case 'w':
      case 'arrowup':
        if (direction !== Direction.DOWN) newDirection = Direction.UP;
        break;
      case 's':
      case 'arrowdown':
        if (direction !== Direction.UP) newDirection = Direction.DOWN;
        break;
      case 'a':
      case 'arrowleft':
        if (direction !== Direction.RIGHT) newDirection = Direction.LEFT;
        break;
      case 'd':
      case 'arrowright':
        if (direction !== Direction.LEFT) newDirection = Direction.RIGHT;
        break;
    }

    if (newDirection !== null) {
      setDirection(newDirection);
    }
  }, [direction, gameState, startGame]);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const moveSnake = useCallback(() => {
    if (gameState !== GameState.RUNNING) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case Direction.UP:
          head.y -= 1;
          break;
        case Direction.DOWN:
          head.y += 1;
          break;
        case Direction.LEFT:
          head.x -= 1;
          break;
        case Direction.RIGHT:
          head.x += 1;
          break;
      }

      // Wall collision check
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameState(GameState.GAME_OVER);
        return prevSnake;
      }

      // Self collision check
      for (let i = 1; i < newSnake.length; i++) {
        if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
          setGameState(GameState.GAME_OVER);
          return prevSnake;
        }
      }

      newSnake.unshift(head);

      // Food check
      if (head.x === food.x && head.y === food.y) {
        setScore(prevScore => prevScore + 10);
        setFood(generateRandomFood(newSnake));
        setSpeed(prevSpeed => Math.max(50, prevSpeed - SPEED_INCREMENT));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameState]);

  useEffect(() => {
    if (gameState !== GameState.RUNNING) {
      return;
    }

    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [gameState, moveSnake, speed]);

  return { gameState, score, snake, food, startGame };
};

function generateRandomFood(snakeBody: Coordinates[]): Coordinates {
  while (true) {
    const newFood = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
    if (!snakeBody.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      return newFood;
    }
  }
}

export default useGameLogic;
