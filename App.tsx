
import React from 'react';
import GameBoard from './components/GameBoard';
import GameOverlay from './components/GameOverlay';
import useGameLogic from './hooks/useGameLogic';
import { GameState } from './types';

const App: React.FC = () => {
  const { gameState, score, snake, food, startGame } = useGameLogic();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-mono">
      <header className="w-full max-w-lg mb-4 text-center">
        <h1 className="text-4xl font-bold text-green-400 tracking-widest">SNAKE</h1>
        <p className="text-lg text-gray-400">Score: <span className="font-bold text-white">{score}</span></p>
      </header>
      
      <main className="relative">
        {(gameState === GameState.IDLE || gameState === GameState.GAME_OVER) && (
          <GameOverlay gameState={gameState} score={score} onStart={startGame} />
        )}
        <GameBoard snake={snake} food={food} />
      </main>

      <footer className="mt-8 text-center text-gray-500">
        <p>Built by a world-class senior frontend React engineer.</p>
        <p>This is a web-based application that runs in a browser window on any OS.</p>
      </footer>
    </div>
  );
};

export default App;