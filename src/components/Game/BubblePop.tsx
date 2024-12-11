import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BubblePopProps {
  onGameOver?: (score: number) => void;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  points: number;
}

const colors = [
  'bg-blue-400',
  'bg-green-400',
  'bg-purple-400',
  'bg-pink-400',
  'bg-yellow-400',
];

const BubblePop: React.FC<BubblePopProps> = ({ onGameOver }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const createBubble = useCallback(() => {
    const size = Math.random() * 20 + 40; // 40-60px
    return {
      id: Math.random(),
      x: Math.random() * (window.innerWidth - size - 40), // Account for padding
      y: window.innerHeight, // Start from bottom
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      points: Math.floor((60 - size) / 10) + 1, // Smaller bubbles = more points
    };
  }, []);

  const popBubble = (id: number, points: number) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== id));
    setScore(prev => prev + points);
  };

  const handleStartGame = () => {
    if (!isPlaying) {
      setScore(0);
      setTimeLeft(30);
      setIsPlaying(true);
      setBubbles([]);
    }
  };

  // Game loop
  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = setInterval(() => {
      setBubbles(prev => {
        // Move existing bubbles up
        const movedBubbles = prev
          .map(bubble => ({
            ...bubble,
            y: bubble.y - 2,
          }))
          .filter(bubble => bubble.y + bubble.size > 0); // Remove bubbles that are off screen

        // Add new bubble with 10% chance
        if (Math.random() < 0.1) {
          return [...movedBubbles, createBubble()];
        }
        return movedBubbles;
      });
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [isPlaying, createBubble]);

  // Timer
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isPlaying]);

  useEffect(() => {
    if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      if (score > highScore) {
        setHighScore(score);
      }
      onGameOver?.(score);
    }
  }, [timeLeft, isPlaying, score, highScore, onGameOver]);

  if (!isPlaying && timeLeft === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] relative">
        <h2 className="text-2xl text-white mb-4">Bubble Pop</h2>
        <p className="text-white mb-4">Final Score: {score}</p>
        {score > highScore && <p className="text-yellow-400 mb-4">New High Score!</p>}
        <button
          onClick={handleStartGame}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (!isPlaying) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] relative">
        <h2 className="text-2xl text-white mb-4">Bubble Pop</h2>
        <p className="text-white mb-4">Pop as many bubbles as you can in 30 seconds!</p>
        <button
          onClick={handleStartGame}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-[500px] relative overflow-hidden">
      <div className="absolute top-4 left-0 right-0 flex justify-between px-8 z-10">
        <p className="text-white/70 text-xl">Score: {score}</p>
        <p className="text-white/70 text-xl">Time: {timeLeft}s</p>
      </div>

      <AnimatePresence>
        {bubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{
              position: 'absolute',
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
            }}
            className={`${bubble.color} rounded-full cursor-pointer 
              shadow-lg opacity-80 hover:opacity-100 transition-opacity
              flex items-center justify-center`}
            onClick={() => popBubble(bubble.id, bubble.points)}
          >
            <span className="text-xs font-bold text-white/90">
              +{bubble.points}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BubblePop;
