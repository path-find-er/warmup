export type Challenge = {
  test: number;
  correct?: boolean;
  attempt?: number;
};

export type Operation = 'add' | 'subtract';
export type difficultyRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Level = {
  challenges: Challenge[];
  currentChallenge: number;
};

export type scores = {
  currentScore: number;
  previousScores: number[];
};

export type GameSettings = {
  difficulty: difficultyRange;
  timeLimit: number;
  operation: Operation;
};

export type GameState = {
  level: Level;
  scores: scores;
  settings: GameSettings;
  isPaused: boolean;
};

export type GameAction =
  | {
      type: 'UPDATE_DIFFICULTY';
      payload: {
        difficulty: difficultyRange;
      };
    }
  | {
      type: 'UPDATE_OPERATION';
      payload: {
        operation: Operation;
      };
    }
  | {
      type: 'UPDATE_TIME_LIMIT';
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
  | { type: 'RESUME' }
  | { type: 'PAUSE' }
  | { type: 'END_ROUND' };
