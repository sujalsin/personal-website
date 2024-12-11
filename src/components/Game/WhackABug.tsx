import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBug } from 'react-icons/fa';

interface WhackABugProps {
  onGameOver?: (score: number) => void;
}

interface Hole {
  id: number;
  hasBug: boolean;
  bugType: 'normal' | 'golden' | 'bomb';
}

const WhackABug: React.FC<WhackABugProps> = ({ onGameOver }) => {
  const [holes, setHoles] = useState<Hole[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [lastWhacked, setLastWhacked] = useState<number | null>(null);

  // Initialize holes
  useEffect(() => {
    const initialHoles = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      hasBug: false,
      bugType: 'normal' as const,
    }));
    setHoles(initialHoles);
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setLastWhacked(null);
  };

  const whackBug = (id: number, bugType: 'normal' | 'golden' | 'bomb') => {
    if (!isPlaying || lastWhacked === id) return;

    setLastWhacked(id);
    setHoles(prev => prev.map(hole => 
      hole.id === id ? { ...hole, hasBug: false } : hole
    ));

    switch (bugType) {
      case 'normal':
        setScore(prev => prev + 1);
        break;
      case 'golden':
        setScore(prev => prev + 3);
        break;
      case 'bomb':
        setScore(prev => Math.max(0, prev - 2));
        break;
    }
  };

  // Show bugs randomly
  useEffect(() => {
    if (!isPlaying) return;

    const showBug = () => {
      setHoles(prev => {
        const available = prev.filter(hole => !hole.hasBug).map(hole => hole.id);
        if (available.length === 0) return prev;

        const randomIndex = Math.floor(Math.random() * available.length);
        const randomHoleId = available[randomIndex];
        
        // 10% chance for golden bug, 15% chance for bomb
        const random = Math.random();
        const bugType = random < 0.1 ? 'golden' : random < 0.25 ? 'bomb' : 'normal';

        return prev.map(hole =>
          hole.id === randomHoleId
            ? { ...hole, hasBug: true, bugType }
            : hole
        );
      });
    };

    const hideAllBugs = () => {
      setHoles(prev => prev.map(hole => ({ ...hole, hasBug: false })));
    };

    const bugInterval = setInterval(showBug, 1000);
    const hideInterval = setInterval(hideAllBugs, 2000);

    return () => {
      clearInterval(bugInterval);
      clearInterval(hideInterval);
    };
  }, [isPlaying]);

  // Timer
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      if (score > highScore) {
        setHighScore(score);
      }
      onGameOver?.(score);
    }
  }, [timeLeft, isPlaying, score, highScore, onGameOver]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white/80 mb-2">Whack-a-Bug</h2>
        <p className="text-white/60">Squash those pesky bugs!</p>
      </div>

      {isPlaying && (
        <div className="flex justify-between w-full max-w-md mb-4">
          <p className="text-white/70">Score: {score}</p>
          <p className="text-white/70">Time: {timeLeft}s</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {holes.map(hole => (
          <motion.div
            key={hole.id}
            className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => hole.hasBug && whackBug(hole.id, hole.bugType)}
          >
            <AnimatePresence>
              {hole.hasBug && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className={`text-3xl ${
                    hole.bugType === 'golden'
                      ? 'text-yellow-400'
                      : hole.bugType === 'bomb'
                      ? 'text-red-400'
                      : 'text-green-400'
                  }`}
                >
                  <FaBug />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {!isPlaying && (
        <div className="text-center space-y-4">
          <p className="text-white/70">High Score: {highScore}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start Game
          </motion.button>
        </div>
      )}

      <div className="text-white/60 text-center max-w-md mt-4">
        <p> Normal Bug: +1 point</p>
        <p> Golden Bug: +3 points</p>
        <p> Bomb Bug: -2 points</p>
      </div>
    </div>
  );
};

export default WhackABug;
