import { Draft, produce } from 'immer';

import { validateAnswer } from '@/utils';

import { difficultyRange, GameState, Level, Operation } from '@/types';

const generateRandomChallenges = () => {
  const numbers = Array(10)
    .fill(null)
    .map(() => Math.random());
  const challenges = numbers.map((number) => {
    return {
      test: Math.floor(number * 10),
    };
  });
  return challenges;
};

const generateInitialLevel = () => {
  return {
    difficulty: 5,
    operation: 'add',
    timeLimit: 2,
    challenges: generateRandomChallenges(),
    currentChallenge: 0,
  } as Level;
};

export const initialState: GameState = {
  level: generateInitialLevel(),
  scores: {
    currentScore: 0,
    previousScores: [],
  },
  isPaused: true,
};

export type GameAction =
  | {
      type: 'SET_DIFFICULTY';
      payload: {
        difficulty: difficultyRange;
      };
    }
  | {
      type: 'SET_OPERATION';
      payload: {
        operation: Operation;
      };
    }
  | {
      type: 'SET_TIME_LIMIT';
      payload: {
        timeLimit: number;
      };
    }
  | {
      type: 'ATTEMPT';
      payload: {
        index: number;
        attempt: number;
      };
    }
  | {
      type: 'TOO_SLOW';
      payload: {
        index: number;
        attempt: number;
      };
    }
  | { type: 'RESUME_GAME' }
  | { type: 'PAUSE_GAME' }
  | { type: 'END_ROUND' }
  | { type: 'RESET_GAME' };

const gameReducer = produce((draft: Draft<GameState>, action: GameAction) => {
  switch (action.type) {
    case 'PAUSE_GAME':
      draft.isPaused = true;
      break;
    case 'RESUME_GAME':
      draft.isPaused = false;
      break;
    case 'TOO_SLOW': {
      const { index, attempt } = action.payload;
      if (index < 9) {
        draft.level.challenges[index].attempt = attempt;
        draft.level.challenges[index].correct = false;
        draft.level.currentChallenge = index + 1;
      } else {
        draft.scores.previousScores.push(draft.scores.currentScore);
        draft.scores.currentScore = 0;
        draft.level = generateInitialLevel();
      }
      break;
    }

    case 'SET_DIFFICULTY':
      draft.level.difficulty = action.payload.difficulty;
      break;
    case 'SET_OPERATION':
      draft.level.operation = action.payload.operation;
      break;
    case 'SET_TIME_LIMIT':
      draft.level.timeLimit = action.payload.timeLimit;
      break;
    case 'ATTEMPT': {
      const { index, attempt } = action.payload;
      const valid = validateAnswer(
        draft.level.challenges[index].test,
        attempt,
        draft.level.difficulty,
        draft.level.operation
      );
      draft.scores.currentScore += valid ? 1 : 0;
      if (index < 9) {
        draft.level.challenges[index].attempt = attempt;
        draft.level.challenges[index].correct = valid;
        draft.level.currentChallenge = index + 1;
      } else {
        draft.scores.previousScores.push(draft.scores.currentScore);
        draft.scores.currentScore = 0;
        draft.level = generateInitialLevel();
      }
      break;
    }
    case 'END_ROUND':
      draft.scores.previousScores.push(draft.scores.currentScore);
      draft.scores.currentScore = 0;
      draft.level.challenges = generateRandomChallenges();
      break;
    case 'RESET_GAME':
      return initialState;
    default:
      break;
  }
}, initialState);

export default gameReducer;
