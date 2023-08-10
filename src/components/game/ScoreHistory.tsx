// src/components/game/ScoreHistory.tsx
import React from 'react';

type ScoreHistoryProps = {
  previousScores: number[];
};

const ScoreHistory: React.FC<ScoreHistoryProps> = ({ previousScores }) => {
  return (
    <div className='mt-4 flex w-full max-w-md flex-col rounded bg-white p-4 shadow-md'>
      <h2 className='text-lg font-semibold'>Previous Scores</h2>
      <ul className='list-inside list-decimal'>
        {previousScores.length === 0 ? (
          <p className='text-gray-500'>No scores available.</p>
        ) : (
          previousScores.map((score, index) => (
            <li key={`score-${index}`} className='text-gray-700'>
              Round {index + 1}: {score} out of 10
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ScoreHistory;
