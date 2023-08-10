import React from 'react';

import { GameAction } from '@/types';

export const PauseButton: React.FC<{
  dispatch: React.Dispatch<GameAction>;
  isPaused: boolean;
}> = ({ dispatch, isPaused }) => (
  <button
    className={`${isPaused === false ? 'bg-red-500' : 'bg-green-500'} hover:${
      isPaused === false ? 'bg-red-700' : 'bg-green-700'
    } rounded px-4 py-2 font-bold text-white`}
    onClick={() =>
      dispatch({
        type: isPaused === false ? 'PAUSE' : 'RESUME',
      })
    }
  >
    {isPaused === false ? 'Pause' : 'Resume'}
  </button>
);

export default PauseButton;
