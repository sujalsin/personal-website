import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateUniqueName } from '../../utils/nameGenerator';

interface LeaderboardProps {
  isGameOver: boolean;
  currentScore: number;
  gameName: string;
  onClose: () => void;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  game: string;
  timestamp: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  isGameOver,
  currentScore,
  gameName,
  onClose,
}) => {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const leaderboardRef = useRef<HTMLDivElement>(null);
  const sessionStartTime = useRef(Date.now());

  useEffect(() => {
    // Load scores from localStorage
    const savedScores = localStorage.getItem('gameScores');
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }

    // Load or generate player name
    const savedName = localStorage.getItem('playerName');
    if (savedName) {
      setPlayerName(savedName);
    } else {
      const newName = generateUniqueName();
      setPlayerName(newName);
      localStorage.setItem('playerName', newName);
    }
  }, []);

  useEffect(() => {
    if (isGameOver && !isSubmitted && currentScore > 0) {
      const newEntry: LeaderboardEntry = {
        name: playerName,
        score: currentScore,
        game: gameName,
        timestamp: Date.now(),
      };

      const newScores = [...scores, newEntry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 100); // Keep top 100 scores

      setScores(newScores);
      localStorage.setItem('gameScores', JSON.stringify(newScores));
      setIsSubmitted(true);

      // Scroll to the new score after a short delay
      setTimeout(() => {
        const newScoreElement = document.getElementById(`score-${newEntry.timestamp}`);
        if (newScoreElement) {
          newScoreElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [isGameOver, currentScore, playerName, gameName, scores, isSubmitted]);

  useEffect(() => {
    if (!isGameOver) {
      setIsSubmitted(false);
    }
  }, [isGameOver]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const oldName = playerName;

    // Update all scores from this session with the new name
    const updatedScores = scores.map(score => {
      if (score.name === oldName && score.timestamp >= sessionStartTime.current) {
        return { ...score, name: newName };
      }
      return score;
    });

    setScores(updatedScores);
    setPlayerName(newName);
    localStorage.setItem('playerName', newName);
    localStorage.setItem('gameScores', JSON.stringify(updatedScores));
  };

  if (!isGameOver || currentScore === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
    >
      <div className="bg-gray-800/90 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl text-white mb-4">Game Over!</h2>
        <p className="text-lg text-white mb-4">Your Score: {currentScore}</p>
        
        <div className="mb-4">
          <label className="text-white block mb-2">Your Name:</label>
          <input
            type="text"
            value={playerName}
            onChange={handleNameChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded"
            placeholder="Enter your name"
          />
        </div>

        <div className="max-h-60 overflow-y-auto mb-4" ref={leaderboardRef}>
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-800">
              <tr>
                <th className="text-white/60 text-left py-2">Rank</th>
                <th className="text-white/60 text-left py-2">Name</th>
                <th className="text-white/60 text-right py-2">Score</th>
                <th className="text-white/60 text-right py-2">Game</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((entry, index) => (
                <tr
                  key={`${entry.timestamp}-${index}`}
                  id={`score-${entry.timestamp}`}
                  className={`${
                    entry.timestamp === scores.find(s => s.score === currentScore)?.timestamp
                      ? 'bg-blue-500/20'
                      : ''
                  }`}
                >
                  <td className="text-white/60 py-1">{index + 1}</td>
                  <td className="text-white py-1">{entry.name}</td>
                  <td className="text-white text-right py-1">{entry.score}</td>
                  <td className="text-white/60 text-right py-1 text-sm">{entry.game}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Play Again
        </button>
      </div>
    </motion.div>
  );
};

export default Leaderboard;
