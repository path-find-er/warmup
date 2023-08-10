import { Operation } from '@/types';

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
