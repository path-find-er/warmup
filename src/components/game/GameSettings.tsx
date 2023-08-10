import React from 'react';

import DifficultySelector from './settings/DifficultySelector';
import OperationToggle from './settings/OperationToggle';
import TimeLimitSelector from './settings/TimeLimitSelector';

import { GameAction, GameState } from '@/types';

type GameSettingsProps = {
  dispatch: React.Dispatch<GameAction>;
  state: GameState;
};
const GameSettings: React.FC<GameSettingsProps> = ({ dispatch, state }) => {
  return (
    <div className='mb-4  flex w-full max-w-md flex-col gap-2 rounded bg-white p-4 shadow-md'>
      <DifficultySelector
        dispatch={dispatch}
        difficulty={state.settings.difficulty}
      />
      <OperationToggle
        dispatch={dispatch}
        operation={state.settings.operation}
      />
      <TimeLimitSelector
        dispatch={dispatch}
        timeLimit={state.settings.timeLimit}
      />
    </div>
  );
};

export default GameSettings;
