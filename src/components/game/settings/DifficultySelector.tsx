import React from 'react';

import type { GameAction } from '@/types';
import { difficultyRange } from '@/types';

export const DifficultySelector: React.FC<{
  dispatch: React.Dispatch<GameAction>;
  difficulty: difficultyRange;
}> = ({ dispatch, difficulty }) => {
  const handleSetDifficulty = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_DIFFICULTY',
      payload: {
        difficulty: mapToDifficultyRange(parseInt(event.target.value)),
      },
    });
  };

  return (
    <div className='flex flex-row items-center justify-between'>
      <label htmlFor='difficulty' className='text-sm text-gray-700'>
        Amount:
      </label>
      <input
        id='difficulty'
        className='focus:shadow-outline w-2/3 appearance-none rounded leading-tight text-gray-700 focus:outline-none'
        type='number'
        min={1}
        max={9}
        onChange={handleSetDifficulty}
        value={difficulty}
      />
    </div>
  );
};

export default DifficultySelector;

function mapToDifficultyRange(newD: number): difficultyRange {
  return (newD >= 1 && newD <= 9 ? newD : 1) as difficultyRange;
}
