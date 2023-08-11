'use client';

import React, { useReducer } from 'react';

import gameReducer from '@/state';
import { initialState } from '@/state';

import Level from './Level';
import Scores from './Scores';
import Settings from './Settings';

const Game: React.FC = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <>
      <div className='mt-0 flex h-screen w-screen flex-col-reverse items-center justify-end bg-gray-100 px-8 py-3 sm:flex-col'>
        <Settings dispatch={dispatch} state={state} />

        <Level dispatch={dispatch} state={state} />
        <Scores
          currentScore={state.scores.currentScore}
          previousScores={state.scores.previousScores}
        />
        <span className='font-mono text-xs text-slate-400 hover:text-slate-900 sm:my-4'>
          Hint: (value + 10) % 10
        </span>
      </div>
    </>
  );
};

export default Game;
