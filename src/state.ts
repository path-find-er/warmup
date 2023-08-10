import { Draft, produce } from 'immer';

import { validateAnswer } from '@/utils';

import { difficultyRange, GameState, Operation } from '@/types';

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

export const initialState: GameState = {
  level: {
    difficulty: 1,
    operation: 'add',
    timeLimit: 1,
    challenges: generateRandomChallenges(),
    currentChallenge: 0,
  },
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
      handleChallenge(draft, index, attempt);
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
      handleChallenge(draft, index, attempt, valid);
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

const handleChallenge = (
  draft: GameState,
  index: number,
  attempt: number,
  correct?: boolean
) => {
  // check if index is greater than len(challenges)
  if (index < 10) {
    draft.level.challenges[index].attempt = attempt;
    draft.level.challenges[index].correct =
      correct !== undefined ? correct : false;
    draft.level.currentChallenge = index + 1;
  } else {
    draft.scores.previousScores.push(draft.scores.currentScore);
    draft.scores.currentScore = 0;
    draft.level.challenges = generateRandomChallenges();
    draft.level.currentChallenge = 0;
  }

  return draft;
};
