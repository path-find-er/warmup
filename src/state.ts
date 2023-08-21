import { Draft, produce } from 'immer';

import {
  correctAnswerIs,
  generateInitialLevel,
  generateSettings,
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
      const { index } = action.payload;
      const correctAnswer = correctAnswerIs(
        draft.level.challenges[index].test,
        draft.settings.difficulty,
        draft.settings.operation
      );
      draft.level.challenges[index].correct = false;
      draft.level.challenges[index].attempt = undefined;
      draft.level.challenges[index].correctAnswer = correctAnswer;

      const next_Index = (index + 11) % 10;

      draft.level.currentChallenge = next_Index;

      if (next_Index === 0) {
        draft.scores.previousScores.push({
          score: draft.scores.currentScore,
          settings: draft.settings,
        });
        draft.scores.currentScore = 0;
        draft.level = generateInitialLevel();
        draft.settings = generateSettings(draft.scores.previousScores.length);
      }
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
      const [valid, correctAnswer] = validateAnswer(
        draft.level.challenges[index].test,
        attempt,
        draft.settings.difficulty,
        draft.settings.operation
      );

      draft.scores.currentScore += valid ? 1 : 0;
      draft.level.challenges[index].correct = valid;
      draft.level.challenges[index].attempt = attempt;
      draft.level.challenges[index].correctAnswer = correctAnswer;

      // set the next index from 0 to 9
      const next_Index = (index + 11) % 10;
      draft.level.currentChallenge = next_Index;
      if (next_Index === 0) {
        draft.scores.previousScores.push({
          score: draft.scores.currentScore,
          settings: draft.settings,
        });
        draft.scores.currentScore = 0;
        draft.level = generateInitialLevel();
        draft.settings = generateSettings(draft.scores.previousScores.length);
      }
      break;
    }
  }
}, initialState);

export default gameReducer;
