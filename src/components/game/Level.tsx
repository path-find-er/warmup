import React, { useEffect, useRef } from 'react';

import InputCell from '@/components/game/display/InputCell';

import PauseButton from './display/PauseButton';

import { GameAction } from '@/types';
import { GameState } from '@/types';

interface LevelProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const Level: React.FC<LevelProps> = ({ state, dispatch }) => {
  const {
    level: { challenges, currentChallenge },
    settings: { timeLimit },
    isPaused,
  } = state;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (timeLimit > 0 && !isPaused) {
      timerRef.current = setTimeout(() => {
        const newAttempt = challenges[currentChallenge].attempt;
        dispatch({
          type: 'TOO_SLOW',
          payload: { index: currentChallenge, attempt: newAttempt ?? 0 },
        });
      }, timeLimit * 1000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [challenges, currentChallenge, dispatch, isPaused, timeLimit]);

  return (
    <div className='my-5 flex flex-col items-center justify-center'>
      <div className='my-4 flex w-full flex-row rounded bg-white p-4 shadow-md'>
        {challenges.map((challenge, index) => (
          <div
            key={`${index}-challenge-${challenge.test}`}
            className='flex w-full flex-col items-center'
          >
            <div className='w-full border border-gray-300 px-2 py-1 text-center text-gray-700 sm:mx-2'>
              {challenge.test}
            </div>
            <InputCell
              challengeIndex={index}
              dispatch={dispatch}
              attempt={challenge.attempt}
              correct={challenge.correct}
              isCurrent={state.level.currentChallenge === index}
            />
          </div>
        ))}
      </div>
      <PauseButton dispatch={dispatch} isPaused={isPaused} />
    </div>
  );
};

export default Level;
