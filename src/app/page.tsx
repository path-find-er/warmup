'use client';

import React, { useReducer } from 'react';

import Level from '@/components/game/Level';
import Scores from '@/components/game/Scores';
import Settings from '@/components/game/Settings';

import gameReducer from '@/state';
import { initialState } from '@/state';

import PauseButton from '../components/game/display/PauseButton';

export default function HomePage() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <main className='flex h-screen w-full flex-col items-center justify-end gap-8 px-4 py-16 sm:justify-center sm:px-10 md:px-16'>
      <div className='flex flex-col-reverse gap-8 sm:max-h-[420px] sm:flex-row '>
        <Settings dispatch={dispatch} state={state} />
        <Scores
          currentScore={state.scores.currentScore}
          previousScores={state.scores.previousScores}
        />
      </div>
      <div className='flex w-full flex-col items-center justify-center gap-8'>
        <Level dispatch={dispatch} state={state} />
        <PauseButton dispatch={dispatch} isPaused={state.isPaused} />
      </div>
    </main>
  );
}
