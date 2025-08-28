
import React from 'react';
import { GameState } from '../types';

interface GameOverlayProps {
  gameState: GameState;
  score: number;
  onStart: () => void;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ gameState, score, onStart }) => {
  if (gameState === GameState.RUNNING) return null;

  const isIdle = gameState === GameState.IDLE;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center rounded-lg text-center p-8 z-10">
      {isIdle ? (
        <>
          <h2 className="text-5xl font-extrabold text-white mb-4 tracking-widest">SNAKE</h2>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 mb-6">
            <h3 className="text-xl font-bold text-green-400 mb-2">Controls</h3>
            <p className="text-gray-300">Use <kbd className="font-sans bg-gray-700 px-2 py-1 rounded">W</kbd> <kbd className="font-sans bg-gray-700 px-2 py-1 rounded">A</kbd> <kbd className="font-sans bg-gray-700 px-2 py-1 rounded">S</kbd> <kbd className="font-sans bg-gray-700 px-2 py-1 rounded">D</kbd> or Arrow Keys to move.</p>
          </div>
          <p className="text-lg text-gray-400 animate-pulse">Press any key to start</p>
        </>
      ) : (
        <>
          <h2 className="text-5xl font-extrabold text-red-500 mb-4">GAME OVER</h2>
          <p className="text-2xl text-white mb-6">Final Score: {score}</p>
          <button
            onClick={onStart}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400"
          >
            Play Again
          </button>
        </>
      )}
    </div>
  );
};

export default GameOverlay;
