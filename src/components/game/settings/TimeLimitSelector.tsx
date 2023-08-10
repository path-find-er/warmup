import React from 'react';

import type { GameAction } from '@/state';

export const TimeLimitSelector: React.FC<{
  dispatch: React.Dispatch<GameAction>;
  timeLimit: number;
}> = ({ dispatch, timeLimit }) => (
  <div className='flex items-center justify-between'>
    <label htmlFor='timeLimit' className='text-sm text-gray-700'>
      Time Limit ({timeLimit}):
    </label>
    <input
      id='timeLimit'
      type='range'
      min={1}
      max={10}
      className='h-2 w-2/3 appearance-none rounded-full bg-gray-300'
      onChange={(e) =>
        dispatch({
          type: 'SET_TIME_LIMIT',
          payload: { timeLimit: parseInt(e.target.value) },
        })
      }
      defaultValue={timeLimit}
    />
  </div>
);

export default TimeLimitSelector;
