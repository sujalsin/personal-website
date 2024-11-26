import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Challenge {
  id: number;
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  hint: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: 'Fix the Array Method',
    description: 'This code should filter out all negative numbers. Fix the array method.',
    initialCode: `const numbers = [-2, 5, -6, 8, -1, 4];
const positive = numbers.filter(num => );`,
    solution: `const numbers = [-2, 5, -6, 8, -1, 4];
const positive = numbers.filter(num => num > 0);`,
    hint: 'The filter method should return true for positive numbers',
    difficulty: 'Easy'
  },
  {
    id: 2,
    title: 'Complete the Promise',
    description: 'Complete the Promise to resolve with the calculated sum after 1 second.',
    initialCode: `const calculateSum = (a, b) => {
  return new Promise((resolve, reject) => {
    
  });
};`,
    solution: `const calculateSum = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(a + b), 1000);
  });
};`,
    hint: 'Use setTimeout to delay the resolution',
    difficulty: 'Medium'
  },
  {
    id: 3,
    title: 'Fix the React Hook',
    description: 'This useEffect hook should update the document title when count changes.',
    initialCode: `useEffect(() => {
  document.title = count;
})`,
    solution: `useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);`,
    hint: 'Remember to add dependencies to the useEffect hook',
    difficulty: 'Medium'
  }
];

const CodeBreaker: React.FC = () => {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(challenges[0]);
  const [userCode, setUserCode] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setUserCode(currentChallenge.initialCode);
  }, [currentChallenge]);

  const checkSolution = () => {
    // Remove whitespace and newlines for comparison
    const normalizedUserCode = userCode.replace(/\s/g, '');
    const normalizedSolution = currentChallenge.solution.replace(/\s/g, '');

    if (normalizedUserCode === normalizedSolution) {
      const points = currentChallenge.difficulty === 'Easy' ? 10 : 
                    currentChallenge.difficulty === 'Medium' ? 20 : 30;
      setScore(prev => prev + points);
      setFeedback('Great job! You solved it! 🎉');
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        if (currentChallenge.id < challenges.length) {
          setCurrentChallenge(challenges[currentChallenge.id]);
        }
      }, 2000);
    } else {
      setFeedback('Not quite right. Try again! 🤔');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm"></div>
        {/* Matrix-like raining code effect */}
        <div className="absolute inset-0" style={{ background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat`}}></div>
        {/* Floating particles */}
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.1) 0%, rgba(76, 29, 149, 0) 50%)`}}></div>
      </div>

      <div className="relative bg-gray-900/80 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-gray-800/50">
        {/* Glow effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-xl filter blur-xl opacity-50"></div>
        
        <div className="relative">
          {/* Header with animated gradient border */}
          <div className="flex justify-between items-center mb-8 p-4 rounded-lg bg-gray-800/50 border border-transparent hover:border-indigo-500/30 transition-colors duration-300">
            <div>
              <h3 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                {currentChallenge.title}
              </h3>
              <span className="text-sm text-gray-400 mt-1 inline-block">
                Difficulty: 
                <span className={`ml-2 px-2 py-0.5 rounded ${
                  currentChallenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                  currentChallenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {currentChallenge.difficulty}
                </span>
              </span>
            </div>
            <div className="relative">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                {score}
              </div>
              <span className="text-xs text-gray-400 absolute -bottom-4 right-0">POINTS</span>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-gray-300 mb-4">{currentChallenge.description}</p>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className="text-sm px-4 py-2 rounded-md text-indigo-400 hover:text-indigo-300 transition-colors duration-300 border border-indigo-500/30 hover:border-indigo-500/50"
              onClick={() => setShowHint(!showHint)}
            >
              {showHint ? '🎯 Hide Hint' : '💡 Show Hint'}
            </motion.button>
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
                >
                  <p className="text-gray-300 text-sm">
                    💡 {currentChallenge.hint}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Code Editor with enhanced styling */}
          <div className="mb-8">
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 rounded-t-lg border-b border-gray-700 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
              </div>
              <div className="pt-8 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-48 bg-transparent text-gray-100 font-mono text-sm focus:outline-none p-4"
                  spellCheck="false"
                  style={{ lineHeight: '1.5' }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg shadow-lg transition-all duration-300 font-medium"
              onClick={checkSolution}
            >
              Submit Solution
            </motion.button>
            <span className={`text-sm px-4 py-2 rounded-full ${
              feedback.includes('Great') 
                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                : feedback 
                  ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                  : ''
            }`}>
              {feedback}
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-2xl border border-indigo-500/30 text-center max-w-md mx-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-xl filter blur-xl"></div>
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                  >
                    <span className="text-5xl">🎉</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mt-4">
                    Challenge Complete!
                  </h3>
                  <p className="text-gray-300 mt-2">Moving to next challenge...</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodeBreaker;
