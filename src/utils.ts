import { Draft } from 'immer';

import { GameState, Level, Operation } from '@/types';

export const generateRandomIntegers = (): number[] => {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
};

export const normalizeAnswer = (value: number): number => {
  return (value + 10) % 10;
};

export const validateAnswer = (
  integer: number,
  userValue: number,
  difficulty: number,
  operation: Operation
): boolean => {
  const correctValue =
    operation === 'add'
      ? normalizeAnswer(integer + difficulty)
      : normalizeAnswer(integer - difficulty);
  return correctValue === userValue;
};

export const generateRandomChallenges = () => {
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

export const generateInitialLevel = () => {
  return {
    challenges: generateRandomChallenges(),
    currentChallenge: 0,
  } as Level;
};

export function next_level(
  draft: Draft<GameState>,
  valid: boolean,
  index: number,
  attempt: number
) {
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
}
