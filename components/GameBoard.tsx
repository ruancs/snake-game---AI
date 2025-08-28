import React from 'react';
import { Coordinates } from '../types';
import { BOARD_SIZE, CELL_SIZE_PX } from '../constants';

interface GameBoardProps {
  snake: Coordinates[];
  food: Coordinates;
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food }) => {
  const snakeSegments = new Set(snake.map(s => `${s.x},${s.y}`));
  const snakeHead = snake.length > 0 ? `${snake[0].x},${snake[0].y}` : null;
  const boardPixelSize = BOARD_SIZE * CELL_SIZE_PX;

  return (
    <div 
      className="grid gap-px bg-gray-700 border-4 border-gray-700 rounded-lg shadow-lg"
      style={{
        gridTemplateColumns: `repeat(${BOARD_SIZE}, ${CELL_SIZE_PX}px)`,
        gridTemplateRows: `repeat(${BOARD_SIZE}, ${CELL_SIZE_PX}px)`,
        width: `${boardPixelSize}px`,
        height: `${boardPixelSize}px`,
      }}
    >
      {Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
        const x = index % BOARD_SIZE;
        const y = Math.floor(index / BOARD_SIZE);
        const currentCoord = `${x},${y}`;
        
        const isFood = food.x === x && food.y === y;

        let cellClass = '';
        if (currentCoord === snakeHead) {
          cellClass = 'bg-red-500 rounded-sm';
        } else if (snakeSegments.has(currentCoord)) {
          cellClass = 'bg-red-700 rounded-sm';
        } else if (isFood) {
          cellClass = 'bg-yellow-400 rounded-full scale-90';
        } else {
          cellClass = 'bg-gray-800';
        }
        
        return <div key={index} className={cellClass} />;
      })}
    </div>
  );
};

export default GameBoard;