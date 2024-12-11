import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ColorPatternProps {
  onGameOver?: (score: number) => void;
}

interface ColorTile {
  id: number;
  color: string;
  soundFrequency: number;
}

const colorTiles: ColorTile[] = [
  { id: 0, color: 'from-green-400 to-green-600', soundFrequency: 261.63 }, // C4
  { id: 1, color: 'from-red-400 to-red-600', soundFrequency: 329.63 }, // E4
  { id: 2, color: 'from-blue-400 to-blue-600', soundFrequency: 392.00 }, // G4
  { id: 3, color: 'from-yellow-400 to-yellow-600', soundFrequency: 523.25 }, // C5
];

const ColorPattern: React.FC<ColorPatternProps> = ({ onGameOver }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [canPlay, setCanPlay] = useState(true);
  const [isShowingSequence, setIsShowingSequence] = useState(false);

  // Audio Context setup
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(context);
    return () => {
      context.close();
    };
  }, []);

  const playSound = useCallback((frequency: number) => {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }, [audioContext]);

  const startGame = useCallback(() => {
    setSequence([Math.floor(Math.random() * 4)]);
    setPlayerSequence([]);
    setIsPlaying(true);
    setGameOver(false);
    setCanPlay(false);
    setIsShowingSequence(true);
  }, []);

  const showSequence = useCallback(async () => {
    setIsShowingSequence(true);
    setCanPlay(false);
    
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      playSound(colorTiles[sequence[i]].soundFrequency);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsShowingSequence(false);
    setCanPlay(true);
  }, [sequence, playSound]);

  useEffect(() => {
    if (sequence.length > 0) {
      showSequence();
    }
  }, [sequence, showSequence]);

  const handleTileClick = (tileId: number) => {
    if (!canPlay || isShowingSequence) return;

    playSound(colorTiles[tileId].soundFrequency);
    const newPlayerSequence = [...playerSequence, tileId];
    setPlayerSequence(newPlayerSequence);

    // Check if the player's sequence matches the game sequence
    for (let i = 0; i < newPlayerSequence.length; i++) {
      if (newPlayerSequence[i] !== sequence[i]) {
        setGameOver(true);
        setIsPlaying(false);
        if (sequence.length - 1 > highScore) {
          setHighScore(sequence.length - 1);
        }
        onGameOver?.(sequence.length - 1);
        return;
      }
    }

    // If player completed the sequence correctly
    if (newPlayerSequence.length === sequence.length) {
      setPlayerSequence([]);
      setCanPlay(false);
      setTimeout(() => {
        setSequence([...sequence, Math.floor(Math.random() * 4)]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white/80 mb-2">Color Pattern Memory</h2>
        <p className="text-white/60">
          {gameOver ? 'Game Over!' : isPlaying ? `Level ${sequence.length}` : 'Press Start to Play'}
        </p>
        <p className="text-white/60">High Score: {highScore}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {colorTiles.map((tile) => (
          <motion.button
            key={tile.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: (isShowingSequence && sequence[sequence.length - 1] === tile.id) ? 1.1 : 1,
              opacity: canPlay ? 1 : 0.7
            }}
            onClick={() => handleTileClick(tile.id)}
            className={`w-32 h-32 rounded-xl bg-gradient-to-br ${tile.color} 
              shadow-lg transition-all duration-200 hover:shadow-xl
              ${!canPlay && 'cursor-not-allowed'}`}
            disabled={!canPlay}
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={startGame}
        className={`px-8 py-3 rounded-lg font-medium text-white
          ${isPlaying 
            ? 'bg-gray-600 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        disabled={isPlaying}
      >
        {isPlaying ? 'Game in Progress' : 'Start Game'}
      </motion.button>

      <div className="text-white/60 text-center max-w-md">
        <p>Watch the sequence of colors and repeat it by clicking the tiles in the same order.</p>
        <p className="mt-2">The sequence will get longer with each successful round!</p>
      </div>
    </div>
  );
};

export default ColorPattern;
