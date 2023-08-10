import React from 'react';

import type { GameAction } from '@/types';

export const TimeLimitSelector: React.FC<{
  dispatch: React.Dispatch<GameAction>;
  timeLimit: number;
}> = ({ dispatch, timeLimit }) => (
  <div className='flex items-center justify-between'>
    <label htmlFor='timeLimit' className='text-sm text-gray-700'>
      Time Limit (seconds):
    </label>
    <input
      id='timeLimit'
      className='focus:shadow-outline w-2/3 appearance-none rounded leading-tight text-gray-700 focus:outline-none'
      type='number'
      min={1}
      max={10}
      onChange={(e) =>
        dispatch({
          type: 'UPDATE_TIME_LIMIT',
          payload: { timeLimit: parseInt(e.target.value) },
        })
      }
      defaultValue={timeLimit}
    />
  </div>
);

export default TimeLimitSelector;
