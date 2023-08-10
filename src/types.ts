export type Challenge = {
  test: number;
  correct?: boolean;
  attempt?: number;
};

export type Operation = 'add' | 'subtract';
export type difficultyRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Level = {
  difficulty: difficultyRange;
  operation: Operation;
  timeLimit: number;
  challenges: Challenge[];
  currentChallenge: number;
};

export type scores = {
  currentScore: number;
  previousScores: number[];
};

export type GameState = {
  level: Level;
  scores: scores;
  isPaused: boolean;
};
