// src/components/game/Scores.tsx
import { StarIcon } from 'lucide-react';
import React from 'react';

import { ScoreRecords } from '@/types';

const Scores: React.FC<ScoreRecords> = ({ previousScores }) => {
  return (
    <div className='mx-6 mt-4 h-[30vh] w-full overflow-y-auto rounded bg-white p-4 text-xs shadow-md'>
      <h2 className='mb-2 text-lg font-semibold'>Previous Scores</h2>
      {previousScores.length === 0 ? (
        <p className='text-gray-500'>No scores available.</p>
      ) : (
        <table className='w-full table-auto border-collapse border sm:gap-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 p-1'> type</th>
              <th className='border border-slate-600 p-1'> amount</th>
              <th className='border border-slate-600 p-1'> limit </th>
              <th className='border border-slate-600 p-1'> Scores</th>
            </tr>
          </thead>
          <tbody>
            {previousScores.map(
              (
                { score, settings: { difficulty, operation, timeLimit } },
                index
              ) => (
                <tr key={`score-${index}`}>
                  <td className='border border-slate-600 p-1 text-center font-bold'>
                    {operation === 'add' ? '+' : '-'}
                  </td>
                  <td className='border border-slate-600 p-1 text-center'>
                    {difficulty}
                  </td>
                  <td className='border border-slate-600 p-1 text-center'>
                    {timeLimit.toFixed(1)}s
                  </td>
                  <td className='border border-slate-600 p-1'>
                    <div className='flex flex-row items-center justify-center'>
                      {Array.from({ length: 10 }, (_, i) => (
                        <StarIcon
                          key={`star-${i}`}
                          color={
                            i < score
                              ? score >= 7
                                ? 'green'
                                : score >= 5
                                ? 'yellow'
                                : 'red'
                              : 'gray'
                          }
                          className='h-4 w-4 sm:h-8 sm:w-8'
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Scores;
