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
    <div className='flex h-screen w-screen flex-col-reverse items-center justify-center bg-gray-100 p-8 sm:flex-col'>
      <Settings dispatch={dispatch} state={state} />
      <Level dispatch={dispatch} state={state} />
      <Scores
        currentScore={state.scores.currentScore}
        previousScores={state.scores.previousScores}
      />
    </div>
  );
};

export default Game;
