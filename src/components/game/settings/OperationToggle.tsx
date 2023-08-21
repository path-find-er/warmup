import React from 'react';

import type { GameAction } from '@/types';
import { Operation, operationOptions } from '@/types';

const updateOperation = (operation: Operation): Operation => {
  // get the index of the current operation
  const currentIndex = operationOptions.indexOf(operation);
  // get the next operation
  const nextIndex = (currentIndex + 1) % operationOptions.length;
  // return the next operation
  return operationOptions[nextIndex];
};

export const OperationToggle: React.FC<{
  dispatch: React.Dispatch<GameAction>;
  operation: Operation;
}> = ({ dispatch, operation }) => {
  const toggleOperation = () => {
    dispatch({
      type: 'UPDATE_OPERATION',
      payload: {
        operation: updateOperation(operation),
      },
    });
  };

  const colorClass: Record<Operation, string> = {
    add: 'bg-blue-200',
    subtract: 'bg-amber-100',
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
        className={`${colorClass[operation]} focus:shadow-outline w-full cursor-pointer appearance-none rounded-md p-2 leading-tight text-gray-700 transition duration-300 ease-in-out focus:outline-none`}
      >
        {operation}
      </button>
    </div>
  );
};

export default OperationToggle;
