import { Draft, produce } from 'immer';

import {
  generateInitialLevel,
  generateSettings,
  next_level,
  validateAnswer,
} from '@/utils';

import { GameAction, GameState } from '@/types';

export const initialState: GameState = {
  level: generateInitialLevel(),
  scores: {
    currentScore: 0,
    previousScores: [],
  },
  settings: generateSettings(),
  isPaused: true,
};

const gameReducer = produce((draft: Draft<GameState>, action: GameAction) => {
  switch (action.type) {
    case 'PAUSE':
      draft.isPaused = true;
      break;
    case 'RESUME':
      draft.isPaused = false;
      break;
    case 'TOO_SLOW': {
      const { index, attempt } = action.payload;
      next_level(draft, false, index, attempt);
      break;
    }

    case 'UPDATE_DIFFICULTY':
      draft.settings.difficulty = action.payload.difficulty;
      break;
    case 'UPDATE_OPERATION':
      draft.settings.operation = action.payload.operation;
      break;
    case 'UPDATE_TIME_LIMIT':
      draft.settings.timeLimit = action.payload.timeLimit;
      break;
    case 'ATTEMPT': {
      const { index, attempt } = action.payload;
      const valid = validateAnswer(
        draft.level.challenges[index].test,
        attempt,
        draft.settings.difficulty,
        draft.settings.operation
      );
      next_level(draft, valid, index, attempt);
      break;
    }
  }
}, initialState);

export default gameReducer;
