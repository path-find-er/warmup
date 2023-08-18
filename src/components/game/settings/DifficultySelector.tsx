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
    <div className='flex flex-col items-center justify-between'>
      <div>
        <label
          htmlFor='difficulty'
          className='text-sm font-semibold text-gray-700'
        >
          Amount:
        </label>
        <p className='mb-2 text-xs'>
          Select a level from 0 to 9; this determines the number to add or
          subtract from each integer. Will increase as after each level.
        </p>
      </div>
      <input
        id='difficulty'
        className='focus:shadow-outline w-full appearance-none rounded leading-tight text-gray-700 focus:outline-none'
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
