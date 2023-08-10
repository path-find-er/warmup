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
        defaultValue={difficulty}
      />
    </div>
  );
};

export default DifficultySelector;

function mapToDifficultyRange(newD: number): difficultyRange {
  switch (newD) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
      return 4;
    case 5:
      return 5;
    case 6:
      return 6;
    case 7:
      return 7;
    case 8:
      return 8;
    case 9:
      return 9;
    default:
      return 1;
  }
}
