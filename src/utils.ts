import { difficultyRange, Level, Operation } from '@/types';

export const generateRandomIntegers = (): number[] => {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
};

export const normalizeAnswer = (value: number): number => {
  return (value + 10) % 10;
};

export const correctAnswerIs = (
  integer: number,
  difficulty: number,
  operation: Operation
): number => {
  switch (operation) {
    case 'add': {
      const correctAnswer = normalizeAnswer(integer + difficulty);
      return correctAnswer;
    }
    case 'subtract': {
      const correctAnswer = normalizeAnswer(integer - difficulty);
      return correctAnswer;
    }
    default:
      return 0;
  }
};

export const validateAnswer = (
  integer: number,
  userValue: number,
  difficulty: number,
  operation: Operation
): [boolean, number] => {
  const correctAnswer = correctAnswerIs(integer, difficulty, operation);
  const valid = normalizeAnswer(correctAnswer) === userValue;
  return [valid, correctAnswer];
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

export const generateSettings = (numCompletedLevels = 0) => {
  return {
    difficulty: normalizeAnswer(
      1 + Math.floor(numCompletedLevels / 2)
    ) as difficultyRange,
    // switch from add to subtract every level
    operation: numCompletedLevels % 2 === 0 ? 'subtract' : ('add' as Operation),
    timeLimit: Math.max(5 - numCompletedLevels * 0.2, 2),
  };
};
