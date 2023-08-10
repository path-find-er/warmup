import React from 'react';

import type { GameAction } from '@/state';

import DifficultySelector from './settings/DifficultySelector';
import OperationToggle from './settings/OperationToggle';
import TimeLimitSelector from './settings/TimeLimitSelector';

import { GameState } from '@/types';

type GameSettingsProps = {
  dispatch: React.Dispatch<GameAction>;
  state: GameState;
};
const GameSettings: React.FC<GameSettingsProps> = ({ dispatch, state }) => {
  return (
    <div className='mb-4  flex w-full max-w-md flex-col gap-2 rounded bg-white p-4 shadow-md'>
      <DifficultySelector
        dispatch={dispatch}
        difficulty={state.level.difficulty}
      />
      <OperationToggle dispatch={dispatch} />
      <TimeLimitSelector
        dispatch={dispatch}
        timeLimit={state.level.timeLimit}
      />
    </div>
  );
};

export default GameSettings;
