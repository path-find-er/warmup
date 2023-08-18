import React from 'react';

import type { GameAction } from '@/types';

export const TimeLimitSelector: React.FC<{
  dispatch: React.Dispatch<GameAction>;
  timeLimit: number;
}> = ({ dispatch, timeLimit }) => (
  <div className='flex flex-col items-center justify-between'>
    <div className='w-full'>
      <label
        htmlFor='difficulty'
        className='text-sm font-semibold text-gray-700'
      >
        Time Limit:
      </label>
      <span className='text-xs text-slate-400 hover:text-slate-900 sm:my-4'>
        <p className='mb-2 text-xs'>
          Set a time limit (in seconds) for each input. Will decrease as you
          complete more questions.
        </p>
      </span>
    </div>
    <label htmlFor='timeLimit' className='text-sm text-gray-700'></label>
    <input
      id='timeLimit'
      className='focus:shadow-outline w-full appearance-none rounded leading-tight text-gray-700 focus:outline-none'
      type='number'
      min={1}
      max={10}
      onChange={(e) =>
        dispatch({
          type: 'UPDATE_TIME_LIMIT',
          payload: { timeLimit: parseInt(e.target.value) },
        })
      }
      value={timeLimit}
    />
  </div>
);

export default TimeLimitSelector;
