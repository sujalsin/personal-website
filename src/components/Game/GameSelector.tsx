import React, { useState, useEffect } from 'react';
import ColorPattern from './ColorPattern';
import WordScramble from './WordScramble';
import BubblePop from './BubblePop';
import WhackABug from './WhackABug';
import Leaderboard from './Leaderboard';

interface GameProps {
  onGameOver: (score: number) => void;
}

const games = [
  { component: ColorPattern, name: 'Color Pattern Memory' },
  { component: WordScramble, name: 'Word Scramble' },
  { component: BubblePop, name: 'Bubble Pop' },
  { component: WhackABug, name: 'Whack-a-Bug' },
];

const GameSelector: React.FC = () => {
  const [selectedGameIndex, setSelectedGameIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    // Select a random game on mount
    const randomIndex = Math.floor(Math.random() * games.length);
    setSelectedGameIndex(randomIndex);
  }, []);

  const handleGameOver = (score: number) => {
    setCurrentScore(score);
    setIsGameOver(true);
  };

  const handlePlayAgain = () => {
    setIsGameOver(false);
    setCurrentScore(0);
  };

  const SelectedGame = games[selectedGameIndex].component as React.ComponentType<GameProps>;

  return (
    <div className="relative">
      <SelectedGame onGameOver={handleGameOver} />
      <Leaderboard
        currentScore={currentScore}
        gameName={games[selectedGameIndex].name}
        isGameOver={isGameOver}
        onClose={handlePlayAgain}
      />
    </div>
  );
};

export default GameSelector;
