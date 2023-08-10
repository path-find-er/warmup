'use client';

import React from 'react';
import { useReducer } from 'react';

import gameReducer from '@/state';
import { initialState } from '@/state';

import GameSettings from './GameSettings';
import LevelDisplay from './LevelDisplay';
import ScoreHistory from './ScoreHistory';

const Game: React.FC = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center bg-gray-100 p-8'>
      <GameSettings dispatch={dispatch} state={state} />
      <LevelDisplay state={state} dispatch={dispatch} />
      <ScoreHistory previousScores={state.scores.previousScores} />
    </div>
  );
};

export default Game;
