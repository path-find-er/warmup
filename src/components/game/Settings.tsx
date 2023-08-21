import React from 'react';

import DifficultySelector from './settings/DifficultySelector';
import OperationToggle from './settings/OperationToggle';
import TimeLimitSelector from './settings/TimeLimitSelector';

import { GameAction, GameState } from '@/types';

type SettingsProps = {
  dispatch: React.Dispatch<GameAction>;
  state: GameState;
};
const Settings: React.FC<SettingsProps> = ({ dispatch, state }) => {
  return (
    <div className='rounded-xl px-4 py-5 shadow-sm shadow-slate-800'>
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

export default Settings;
