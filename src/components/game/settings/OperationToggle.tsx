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
    <div className='flex items-center justify-between'>
      <label className='text-sm text-gray-700' htmlFor='operation'>
        Operation:
      </label>
      <button
        id='operation'
        onClick={toggleOperation}
        className={`${
          isAddition ? 'bg-blue-200' : 'bg-rose-100'
        } focus:shadow-outline w-2/3 cursor-pointer appearance-none rounded-md p-2 leading-tight text-gray-700 transition duration-300 ease-in-out focus:outline-none`}
      >
        {isAddition ? 'Addition' : 'Subtraction'}
      </button>
    </div>
  );
};

export default OperationToggle;
