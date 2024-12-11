import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface WordScrambleProps {
  onGameOver?: (score: number) => void;
}

const words = [
  { word: 'REACT', hint: 'Popular JavaScript library' },
  { word: 'CODING', hint: 'Writing computer programs' },
  { word: 'WEBSITE', hint: 'Collection of web pages' },
  { word: 'DEVELOPER', hint: 'Person who creates software' },
  { word: 'DESIGN', hint: 'Plan or create something' },
  { word: 'CREATIVE', hint: 'Original and imaginative' },
  { word: 'DIGITAL', hint: 'Related to computers' },
  { word: 'INTERNET', hint: 'Global computer network' },
  { word: 'SOFTWARE', hint: 'Computer programs' },
  { word: 'MOBILE', hint: 'Portable device' },
];

const WordScramble: React.FC<WordScrambleProps> = ({ onGameOver }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [hint, setHint] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);

  const scrambleWord = (word: string) => {
    const array = word.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
  };

  const getNewWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const wordObj = words[randomIndex];
    setCurrentWord(wordObj.word);
    setHint(wordObj.hint);
    let scrambled = scrambleWord(wordObj.word);
    while (scrambled === wordObj.word) {
      scrambled = scrambleWord(wordObj.word);
    }
    setScrambledWord(scrambled);
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setMessage('');
    setUserGuess('');
    setIsPlaying(true);
    getNewWord();
  };

  const checkAnswer = () => {
    if (userGuess.toUpperCase() === currentWord) {
      setScore(prev => prev + 1);
      setMessage('Correct! 🎉');
      setUserGuess('');
      getNewWord();
    } else {
      setMessage('Try again! 🤔');
    }
  };

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
      setMessage(`Game Over! Final score: ${score}`);
      onGameOver?.(score);
    }
  }, [timeLeft, isPlaying, score, highScore, onGameOver]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white/80 mb-2">Word Scramble</h2>
        <p className="text-white/60">Unscramble the word before time runs out!</p>
      </div>

      {isPlaying ? (
        <>
          <div className="flex justify-between w-full max-w-md">
            <p className="text-white/70">Score: {score}</p>
            <p className="text-white/70">Time: {timeLeft}s</p>
          </div>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-indigo-400 tracking-wider"
          >
            {scrambledWord}
          </motion.div>

          <p className="text-white/60">Hint: {hint}</p>

          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
            className="w-full max-w-md px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white/90 placeholder-gray-400"
            placeholder="Enter your guess..."
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkAnswer}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Check Answer
          </motion.button>

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/70"
            >
              {message}
            </motion.p>
          )}
        </>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-white/70">High Score: {highScore}</p>
          {message && <p className="text-white/70">{message}</p>}
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
    </div>
  );
};

export default WordScramble;
