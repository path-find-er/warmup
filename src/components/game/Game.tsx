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
      <Settings dispatch={dispatch} state={state} />

      <div className=''>
        <Level dispatch={dispatch} state={state} />
        <Scores
          currentScore={state.scores.currentScore}
          previousScores={state.scores.previousScores}
        />
      </div>
    </>
  );
};

export default Game;
