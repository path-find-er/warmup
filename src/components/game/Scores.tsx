// src/components/game/Scores.tsx
import { StarIcon } from 'lucide-react';
import React from 'react';

import { ScoreRecords } from '@/types';

const Scores: React.FC<ScoreRecords> = ({ previousScores }) => {
  return (
    <div className='h-full max-h-44 rounded-xl px-4 py-5 shadow-sm shadow-slate-800 sm:max-h-none'>
      <h2 className='mb-2 text-sm font-semibold'>Previous Scores</h2>
      {previousScores.length === 0 ? (
        <p className='text-gray-500'>No scores available.</p>
      ) : (
        <div className='max-h-24 w-full overflow-y-auto sm:max-h-[350px]'>
          <table className='w-full rounded-lg'>
            <thead>
              <tr>
                <th className='border border-slate-600 p-1'> Scores</th>
              </tr>
            </thead>
            <tbody>
              {previousScores.map(({ score }, index) => (
                <tr key={`score-${index}`}>
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Scores;
