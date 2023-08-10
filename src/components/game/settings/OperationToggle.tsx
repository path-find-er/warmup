import React from 'react';

import type { GameAction } from '@/state';

import { Operation } from '@/types';

export const OperationToggle: React.FC<{
  dispatch: React.Dispatch<GameAction>;
}> = ({ dispatch }) => (
  <div className='flex items-center justify-between'>
    <label className='text-sm text-gray-700' htmlFor='operation'>
      Operation:
    </label>
    <select
      id='operation'
      onChange={(e) =>
        dispatch({
          type: 'SET_OPERATION',
          payload: {
            operation: e.target.value as Operation,
          },
        })
      }
      className=' focus:shadow-outline w-2/3 appearance-none rounded-md border p-2 leading-tight text-gray-700 focus:outline-none'
    >
      <option className='bg-blue-500 p-1 text-white' value='add'>
        Addition
      </option>
      <option className='bg-gray-300 p-1' value='minus'>
        Subraction
      </option>
    </select>
  </div>
);

export default OperationToggle;
