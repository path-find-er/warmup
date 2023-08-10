import React, { useEffect, useRef } from 'react';

import InputCell from '@/components/game/display/InputCell';

import { GameAction } from '@/state';

import PauseButton from './display/PauseButton';

import { GameState } from '@/types';

interface GameDisplayProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const LevelDisplay: React.FC<GameDisplayProps> = ({ state, dispatch }) => {
  const {
    level: { timeLimit, challenges, currentChallenge },
    isPaused,
  } = state;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
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
    <>
      <div className='my-4 flex w-full flex-row rounded bg-white p-4 shadow-md'>
        {challenges.map((challenge, index) => (
          <div key={index} className='flex w-full flex-col items-center'>
            <div className='mx-2 w-full border border-gray-300 px-2 py-1 text-center text-gray-700'>
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
    </>
  );
};

export default LevelDisplay;
