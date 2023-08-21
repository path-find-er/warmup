// import React, { useEffect, useRef } from 'react';

// import InputCell from '@/components/game/display/InputCell';

// import PauseButton from './display/PauseButton';

// import { GameAction } from '@/types';
// import { GameState } from '@/types';

// interface LevelProps {
//   state: GameState;
//   dispatch: React.Dispatch<GameAction>;
// }

// const Level: React.FC<LevelProps> = ({ state, dispatch }) => {
//   const {
//     level: { challenges, currentChallenge },
//     settings: { timeLimit },
//     isPaused,
//   } = state;

//   const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   useEffect(() => {
//     if (timerRef.current) clearTimeout(timerRef.current);

//     if (timeLimit > 0 && !isPaused) {
//       timerRef.current = setTimeout(() => {
//         const newAttempt = challenges[currentChallenge].attempt;
//         dispatch({
//           type: 'TOO_SLOW',
//           payload: { index: currentChallenge, attempt: newAttempt ?? 0 },
//         });
//       }, timeLimit * 1000);
//     }

//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, [challenges, currentChallenge, dispatch, isPaused, timeLimit]);

//   return (
//     <div className='my-5 flex flex-col items-center justify-center'>
//       <span className='text-center font-mono text-xs text-slate-400 hover:text-slate-900 sm:my-4'>
//         (value + 10) % 10
//         <p>The result must be within the 0-9 range.</p>
//       </span>
//       <div className='my-4 flex w-full flex-row rounded bg-white p-4 shadow-md'>
//         {challenges.map((challenge, index) => (
//           <div
//             key={`${index}-challenge-${challenge.test}`}
//             className='flex w-full flex-col items-center'
//           >
//             <div className='relative flex items-center justify-around w-full border border-gray-300 px-2 py-1 text-center text-gray-700 sm:mx-2'>
//               {!challenge.correctAnswer && challenge.test}
//               {challenge.correctAnswer && (
//                 <>
//                   <div className='flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs text-green-700'>
//                     {challenge.test}
//                   </div>
//                   <div className='flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs text-green-700'>
//                     {challenge.correctAnswer}
//                   </div>
//                 </>
//               )}
//             </div>
//             <InputCell
//               challengeIndex={index}
//               dispatch={dispatch}
//               attempt={challenge.attempt}
//               correct={challenge.correct}
//               isCurrent={state.level.currentChallenge === index}
//             />
//           </div>
//         ))}
//       </div>
//       <PauseButton dispatch={dispatch} isPaused={isPaused} />
//     </div>
//   );
// };

// export default Level;

/// ----

import React, { useCallback, useEffect, useRef } from 'react';

import InputCell from '@/components/game/display/InputCell';

import { Challenge, GameAction, GameState } from '@/types';

interface LevelProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const ChallengeItem: React.FC<{
  challenge: Challenge;
  index: number;
  isCurrent: boolean;
  dispatch: React.Dispatch<GameAction>;
}> = ({ challenge, index, isCurrent, dispatch }) => (
  <div className='flex h-full w-7 flex-col items-center sm:w-16'>
    <div className='relative flex w-7 items-center justify-around border border-gray-300 py-1 text-center text-gray-700 sm:mx-2 sm:w-16 sm:px-2'>
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full  ${
          !(challenge.correctAnswer === undefined)
            ? 'bg-slate-100 text-xs'
            : 'text-sm'
        }`}
      >
        {challenge.test}
      </div>
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs text-green-700 ${
          challenge.correctAnswer === undefined && 'hidden'
        }`}
      >
        {challenge.correctAnswer}
      </div>
    </div>
    <InputCell
      challengeIndex={index}
      dispatch={dispatch}
      attempt={challenge.attempt}
      correct={challenge.correct}
      isCurrent={isCurrent}
    />
  </div>
);

const Level: React.FC<LevelProps> = ({ state, dispatch }) => {
  const {
    level: { challenges },
    settings: { timeLimit },
    isPaused,
  } = state;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setupTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (timeLimit > 0 && !isPaused) {
      timerRef.current = setTimeout(() => {
        const newAttempt = challenges[state.level.currentChallenge].attempt;
        dispatch({
          type: 'TOO_SLOW',
          payload: {
            index: state.level.currentChallenge,
            attempt: newAttempt ?? 0,
          },
        });
      }, timeLimit * 1000);
    }
  }, [timeLimit, isPaused, challenges, state.level.currentChallenge, dispatch]);

  useEffect(() => {
    setupTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [setupTimer]);

  return (
    <div className='my-5 flex w-full flex-row items-center justify-center'>
      {challenges.map((challenge, index) => (
        <ChallengeItem
          key={`${index}-challenge-${challenge.test}`}
          challenge={challenge}
          index={index}
          isCurrent={state.level.currentChallenge === index}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
};

export default Level;
