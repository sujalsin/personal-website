import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const codeSnippets = [
  'console.log("Hello World!");',
  'function solve() { return "bugs"; }',
  'const future = await getSuccess();',
  'while(coding) { improve++; }',
  'git commit -m "Fixed everything"',
];

interface TypingGameProps {
  onComplete?: () => void;
}

const TypingGame: React.FC<TypingGameProps> = ({ onComplete }) => {
  const [currentSnippet, setCurrentSnippet] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    if (showGame) {
      setCurrentSnippet(codeSnippets[Math.floor(Math.random() * codeSnippets.length)]);
    }
  }, [showGame]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);

    if (input === currentSnippet) {
      setScore(prev => prev + 1);
      setIsComplete(true);
      setTimeout(() => {
        setUserInput('');
        setIsComplete(false);
        setCurrentSnippet(codeSnippets[Math.floor(Math.random() * codeSnippets.length)]);
      }, 1000);
    }
  };

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto p-6 bg-gray-800 rounded-xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!showGame ? (
        <motion.button
          onClick={() => setShowGame(true)}
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Typing Challenge
        </motion.button>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Code Typing Challenge</h3>
            <span className="text-green-400">Score: {score}</span>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <code className="text-green-400 font-mono">{currentSnippet}</code>
          </div>
          
          <motion.div
            animate={isComplete ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              value={userInput}
              onChange={handleInput}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type the code here..."
              spellCheck="false"
              autoComplete="off"
            />
          </motion.div>

          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-green-400 text-center"
              >
                Perfect! Get ready for the next one...
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default TypingGame;
