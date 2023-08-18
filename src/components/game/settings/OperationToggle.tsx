import React from 'react';

import type { GameAction } from '@/types';
import { Operation } from '@/types';

export const OperationToggle: React.FC<{
  dispatch: React.Dispatch<GameAction>;
  operation: Operation; // New prop
}> = ({ dispatch, operation }) => {
  const isAddition = operation === 'add';
  const toggleOperation = () => {
    dispatch({
      type: 'UPDATE_OPERATION',
      payload: {
        operation: isAddition ? 'subtract' : ('add' as Operation),
      },
    });
  };

  return (
    <div className='flex flex-col items-center justify-between'>
      <div className='w-full'>
        <label
          htmlFor='difficulty'
          className='text-sm font-semibold text-gray-700'
        >
          Operation:
        </label>
        <span className='text-xs text-slate-400 hover:text-slate-900 sm:my-4'>
          <p className='mb-2 text-xs'>
            Choose either "Addition" or "Subtraction" for the arithmetic
            operation. Will switch each round.
          </p>
        </span>
      </div>
      <button
        id='operation'
        onClick={toggleOperation}
        className={`${
          isAddition ? 'bg-blue-200' : 'bg-rose-100'
        } focus:shadow-outline w-full cursor-pointer appearance-none rounded-md p-2 leading-tight text-gray-700 transition duration-300 ease-in-out focus:outline-none`}
      >
        {isAddition ? 'Addition' : 'Subtraction'}
      </button>
    </div>
  );
};

export default OperationToggle;
